import { MySQLParser, MySQLVisitor, parse, QueryContext } from './index';

test("visitor test in parser", () => {
    class Visitor extends MySQLVisitor<QueryContext> {
        constructor(private readonly parser: MySQLParser) {
            super();
        }

        protected defaultResult(): QueryContext {
            return null as any;
        }

        visitQuery(ctx: QueryContext): QueryContext {
            return ctx;
        }
    }

    const parser = parse(`
        CREATE TABLE user_extra_info
        (
            id                  int PRIMARY KEY NOT NULL AUTO_INCREMENT,
            user_id             int UNIQUE      NOT NULL COMMENT 'user indenty',
            created_at          datetime        NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at          datetime        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE = InnoDB
        DEFAULT CHARSET = utf8mb4
        COLLATE = utf8mb4_unicode_ci;
    `);

    const visitor = new Visitor(parser);

    visitor.visit(parser.query());
});