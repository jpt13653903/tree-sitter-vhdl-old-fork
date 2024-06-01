/*------------------------------------------------------------------------------

Copyright (C) John-Philip Taylor
jpt13653903@gmail.com
------------------------------------------------------------------------------*/

#include <stdio.h>
#include <stdint.h>

#include "TokenTree.h"
#include "debug_macros.h"
#include "tree_sitter/alloc.h"
//------------------------------------------------------------------------------

typedef struct NodeTag{
    uint32_t  character; // The character at the current depth
    TokenType type; // UNKNOWN => this is not a valid entry

    struct NodeTag* left;
    struct NodeTag* right;

    struct NodeTag* next; // Sub-tree of the next character
} Node;
static Node* node_new (char character);
static void  node_free(Node* this);
//------------------------------------------------------------------------------

static Node* insert(Node* root, const char* pattern, TokenType type);

// Balancing functions
static Node* balance    (Node* root);
static Node* compress   (Node* root, int count);
static void  sub_balance(Node* node);
//------------------------------------------------------------------------------

static Node* node_new(char character)
{
    Node* this = ts_malloc(sizeof(Node));
    if(!this) return 0;

    this->left = this->right = this->next = 0;

    this->character = (unsigned)character;
    this->type      = UNKNOWN;

    return this;
}
//------------------------------------------------------------------------------

static void node_free(Node* this)
{
    if(this->next ) node_free(this->next);
    if(this->left ) node_free(this->left);
    if(this->right) node_free(this->right);
    ts_free(this);
}
//------------------------------------------------------------------------------

TokenTree* token_tree_new()
{
    TokenTree* this = ts_malloc(sizeof(TokenTree));
    if(!this) return 0;

    this->root = 0;
    return this;
}
//------------------------------------------------------------------------------

void token_tree_free(TokenTree* this)
{
    if(this->root) node_free(this->root);
    ts_free(this);
}
//------------------------------------------------------------------------------

void token_tree_insert(TokenTree* this, const char* pattern, TokenType type)
{
    this->root = insert(this->root, pattern, type);
}
//------------------------------------------------------------------------------

static Node* insert(
    Node*       root,
    const char* pattern,
    TokenType   type
){
    if(!pattern[0]) return root;

    // Keep in vine structure until balancing restructures the tree
    Node* node;
    Node* prev = 0;
    Node* temp = root;

    while(temp){
        if(*pattern < temp->character){
            node        = node_new(*pattern);
            node->right = temp;
            if(pattern[1]) node->next = insert(node->next, pattern+1, type);
            else           node->type = type;
            if(prev) prev->right = node;
            else     root        = node;
            return root;

        }else if(*pattern > temp->character){
            prev = temp;
            temp = temp->right;

        }else{
            if(pattern[1]){
                temp->next = insert(temp->next, pattern+1, type);
            }else{
                // If temp->type null, this node does not have a token assigned yet
                // If the types are the same, this is an alias, and therefore valid
                if((temp->type != UNKNOWN) && (temp->type != type)){
                    error("Duplicate token entry: ...%s = %d", pattern, (int)type);
                }else{
                    temp->type = type;
                }
            }
            return root;
        }
    }
    node = node_new(*pattern);
    if(pattern[1]) node->next = insert(node->next, pattern+1, type);
    else           node->type = type;
    if(prev) prev->right = node;
    else     root        = node;

    return root;
}
//------------------------------------------------------------------------------

/** This balancing operation is based on:
    Quentin F Stout and Bette L Warren,
    "Tree rebalancing in optimal space and time"
    Communications of the ACM, September 1986, Volume 29, Number 9
    https://web.eecs.umich.edu/~qstout/pap/CACM86.pdf
    https://deepblue.lib.umich.edu/bitstream/handle/2027.42/7801/bad3920.0001.001.pdf?sequence=5&isAllowed=y */

void token_tree_balance(TokenTree* this)
{
    this->root = balance(this->root);
}
//------------------------------------------------------------------------------

static Node* balance(Node* root){
    if(!root) return 0;

    // count the items in the vine
    int   count = 0;
    Node* node  = root;
    while(node){
        count++;
        node = node->right;
    }

    // Create the deepest leaves
    int n    = 0x8000;
    int size = count + 1;
    while(n > size) n >>= 1; // n = 2^floor(log2(count + 1))
    size -= n;

    if(size) root = compress(root, size);
    size = count - size;

    // Balance the tree
    while(size > 1){
        size /= 2;
        root  = compress(root, size);
    }

    sub_balance(root);

    return root;
}
//------------------------------------------------------------------------------

static Node* compress(Node* root, int count)
{
    Node* temp  = root->right;
    root->right = temp->left;
    temp->left  = root;
    root        = temp;

    int   n;
    Node* node = root;

    for(n = 1; n < count; n++){
        temp               = node->right->right;
        node->right->right = temp->left;
        temp->left         = node->right;
        node->right        = temp;
        node               = temp;
    }
    return root;
}
//------------------------------------------------------------------------------

static void sub_balance(Node* node)
{
    if(node->next) node->next = balance(node->next);

    if(node->left ) sub_balance(node->left );
    if(node->right) sub_balance(node->right);
}
//------------------------------------------------------------------------------

static int32_t lowercase(int32_t lookahead)
{
    if(lookahead >= 'A' && lookahead <= 'Z') lookahead += 'a' - 'A';
    debug("lookahead = %c(0x%x)", (char)lookahead, lookahead);
    return lookahead;
}
//------------------------------------------------------------------------------

static int32_t advance(TSLexer* lexer)
{
    lexer->advance(lexer, false);
    return lowercase(lexer->lookahead);
}
//------------------------------------------------------------------------------

static bool is_letter_or_digit(int32_t lookahead)
{
    return (lookahead >= 'a' && lookahead <= 'z') ||
           (lookahead >= '0' && lookahead <= '9');
}
//------------------------------------------------------------------------------

static bool finish_identifier(TSLexer* lexer)
{
    int32_t lookahead = lowercase(lexer->lookahead);
    bool    result = false;

    while(!lexer->eof(lexer)){
        lexer->mark_end(lexer);
        if(lookahead == '_') lookahead = advance(lexer);
        if(!is_letter_or_digit(lookahead)) return result;
        lookahead = advance(lexer);
        result = true;
    }
    return result;
}
//------------------------------------------------------------------------------

TokenType token_tree_match(TokenTree* this, TSLexer* lexer, bool accept_identifier)
{
    int32_t   lookahead = lowercase(lexer->lookahead);
    TokenType type      = UNKNOWN;
    Node*     node      = this->root;

    if(accept_identifier){
        // Must start with a letter
        if(lookahead < 'a' || lookahead > 'z') accept_identifier = false;
    }

    while(node){
        if(lexer->eof(lexer)) return type;

        if(lookahead < node->character){
            node = node->left;

        }else if(lookahead > node->character){
            node = node->right;

        }else{
            if(accept_identifier){
                lexer->mark_end(lexer);
                if(lookahead == '_'){
                    lookahead = advance(lexer);
                    if(!is_letter_or_digit(lookahead)) return IDENTIFIER;
                }else{
                    lookahead = advance(lexer);
                }
            }else{
                lookahead = advance(lexer);
            }
            if(node->type != UNKNOWN){ // Keep track of the best option
                lexer->mark_end(lexer);
                type = node->type;
            }
            node = node->next;
        }
    }
    debug("type = %d", type);
    if(accept_identifier){
        if(finish_identifier(lexer) || type == UNKNOWN) type = IDENTIFIER;
    }
    return type;
}
//------------------------------------------------------------------------------

/*
TokenType token_tree_match(TokenTree* this, const int32_t* Pattern, int* Count){
    int       n    = 0;
    TokenType type = UNKNOWN;

    *Count = 0;

    Node* node = this->root;

    while(node){
        if(*pattern < node->character){
            node = node->left;

        }else if(*pattern > node->character){
            node = node->right;

        }else{
            n++;
            if(node->type != UNKNOWN){ // Keep track of the best option
                *count = n;
                type   = node->type;
            }
            if(pattern[1]){
                pattern++;
                node = node->next;
            }else{
                return type;
            }
        }
    }
    return type;
}
//------------------------------------------------------------------------------

TokenType token_tree_find(TokenTree* this, const int32_t* pattern){
    Node* node = this->root;

    while(node){
        if(*pattern < node->character){
            node = node->left;

        }else if(*pattern > node->character){
            node = node->right;

        }else{
            if(pattern[1]){
                pattern++;
                node = node->next;
            }else{
                return node->type;
            }
        }
    }
    return UNKNOWN;
}
//------------------------------------------------------------------------------
*/
