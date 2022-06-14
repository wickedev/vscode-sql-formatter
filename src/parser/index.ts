import { CharStreams, CommonTokenStream } from 'antlr4ts';
import { AbstractParseTreeVisitor } from 'antlr4ts/tree';
import { MySQLLexer } from './MySQLLexer';
import { MySQLParser } from './MySQLParser';
import { MySQLParserVisitor } from './MySQLParserVisitor';

export function parse(sql: string) {
    let inputStream = CharStreams.fromString(sql);
    let lexer = new MySQLLexer(inputStream);
    let tokenStream = new CommonTokenStream(lexer);
    return new MySQLParser(tokenStream);
}

export abstract class MySQLVisitor<Result> extends AbstractParseTreeVisitor<Result> implements MySQLParserVisitor<Result>{ }

export * from "./MySQLLexer";
export * from "./MySQLParser";
export * from "./MySQLParserListener";
export * from "./MySQLParserVisitor";