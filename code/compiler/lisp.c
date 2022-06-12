/**
 * @file lisp.c
 * @author pedrogao
 * @brief
 * @version 0.1
 * @date 2022-06-12
 *
 * @copyright Copyright (c) 2022
 *
 * @brief lisp implement by C
 * @refer https://www.abnerchou.me/BuildYourOwnLispCn/01.Introduction.html
 */
#include <stdio.h>
#include <stdlib.h>

/* If we are compiling on Windows compile these functions */
#ifdef _WIN32
#include <string.h>

static char buffer[2048];

/* Fake readline function */
char *readline(char *prompt)
{
    fputs(prompt, stdout);
    fgets(buffer, 2048, stdin);
    char *cpy = malloc(strlen(buffer) + 1);
    strcpy(cpy, buffer);
    cpy[strlen(cpy) - 1] = '\0';
    return cpy;
}

/* Fake add_history function */
void add_history(char *unused) {}

/* Otherwise include the editline headers */
#endif

#ifdef __linux__
#include <editline/readline.h>
#include <editline/history.h>
#endif

#ifdef __MACH__
#include <editline/readline.h>
#endif

#include "mpc.h"

// defines
long eval_op(long x, char *op, long y);
long eval(mpc_ast_t *t);

// functions
long eval_op(long x, char *op, long y)
{
    if (strcmp(op, "+") == 0)
        return x + y;
    if (strcmp(op, "-") == 0)
        return x - y;
    if (strcmp(op, "*") == 0)
        return x * y;
    if (strcmp(op, "/") == 0)
        return x / y;

    return 0;
}

long eval(mpc_ast_t *t)
{
    if (strstr(t->tag, "number"))
    {
        return atoi(t->contents);
    }

    char *op = t->children[1]->contents;
    long x = eval(t->children[2]);
    int i = 3;
    while (strstr(t->children[i]->tag, "expr"))
    {
        x = eval_op(x, op, eval(t->children[i]));
        i++;
    }
    return x;
}

int main(int argc, char **argv)
{
    // parsers
    mpc_parser_t *Number = mpc_new("number");
    mpc_parser_t *Operator = mpc_new("operator");
    mpc_parser_t *Expr = mpc_new("expr");
    mpc_parser_t *Lispy = mpc_new("lispy");

    // Define expr
    mpca_lang(MPCA_LANG_DEFAULT,
              "                                                     \
    number   : /-?[0-9]+/ ;                             \
    operator : '+' | '-' | '*' | '/' ;                  \
    expr     : <number> | '(' <operator> <expr>+ ')' ;  \
    lispy    : /^/ <operator> <expr>+ /$/ ;             \
",
              Number, Operator, Expr, Lispy);
    // repl
    puts("Lispy Version 1.0.0");
    puts("Press Ctrl+c to Exit\n");

    while (1)
    {

        char *input = readline("lispy> ");
        add_history(input);

        mpc_result_t r;
        if (mpc_parse("<stdin>", input, Lispy, &r))
        {
            /* On Success Print the AST */
            // mpc_ast_print(r.output);
            long result = eval(r.output);
            printf("%li\n", result);
            mpc_ast_delete(r.output);
        }
        else
        {
            /* Otherwise Print the Error */
            mpc_err_print(r.error);
            mpc_err_delete(r.error);
        }

        free(input);
    }

    return 0;
}