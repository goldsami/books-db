const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class initial1638908428847 {
    name = 'initial1638908428847'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`list\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`dateOfBirth\` date NULL, \`createdOn\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedOn\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`ownerId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`list_books_book\` (\`listId\` int NOT NULL, \`bookId\` int NOT NULL, INDEX \`IDX_a04c61705cb077caa8a4f092b3\` (\`listId\`), INDEX \`IDX_2e95cd0420389355700aced74e\` (\`bookId\`), PRIMARY KEY (\`listId\`, \`bookId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`dateOfBirth\` \`dateOfBirth\` date NULL`);
        await queryRunner.query(`ALTER TABLE \`mark\` CHANGE \`userId\` \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`mark\` CHANGE \`bookId\` \`bookId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`book\` CHANGE \`authorId\` \`authorId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`book\` CHANGE \`cycleId\` \`cycleId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`author\` CHANGE \`dateOfBirth\` \`dateOfBirth\` date NULL`);
        await queryRunner.query(`ALTER TABLE \`list\` ADD CONSTRAINT \`FK_f0f290e54e6663b786fe5a8134f\` FOREIGN KEY (\`ownerId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`mark\` ADD CONSTRAINT \`FK_38375646905f9876844d328da90\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`mark\` ADD CONSTRAINT \`FK_30ead57baee3ff76494b836fab7\` FOREIGN KEY (\`bookId\`) REFERENCES \`book\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`book\` ADD CONSTRAINT \`FK_66a4f0f47943a0d99c16ecf90b2\` FOREIGN KEY (\`authorId\`) REFERENCES \`author\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`book\` ADD CONSTRAINT \`FK_e1d51390f41c95f93f3062dada4\` FOREIGN KEY (\`cycleId\`) REFERENCES \`bookCycle\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`list_books_book\` ADD CONSTRAINT \`FK_a04c61705cb077caa8a4f092b34\` FOREIGN KEY (\`listId\`) REFERENCES \`list\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`list_books_book\` ADD CONSTRAINT \`FK_2e95cd0420389355700aced74ef\` FOREIGN KEY (\`bookId\`) REFERENCES \`book\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`list_books_book\` DROP FOREIGN KEY \`FK_2e95cd0420389355700aced74ef\``);
        await queryRunner.query(`ALTER TABLE \`list_books_book\` DROP FOREIGN KEY \`FK_a04c61705cb077caa8a4f092b34\``);
        await queryRunner.query(`ALTER TABLE \`book\` DROP FOREIGN KEY \`FK_e1d51390f41c95f93f3062dada4\``);
        await queryRunner.query(`ALTER TABLE \`book\` DROP FOREIGN KEY \`FK_66a4f0f47943a0d99c16ecf90b2\``);
        await queryRunner.query(`ALTER TABLE \`mark\` DROP FOREIGN KEY \`FK_30ead57baee3ff76494b836fab7\``);
        await queryRunner.query(`ALTER TABLE \`mark\` DROP FOREIGN KEY \`FK_38375646905f9876844d328da90\``);
        await queryRunner.query(`ALTER TABLE \`list\` DROP FOREIGN KEY \`FK_f0f290e54e6663b786fe5a8134f\``);
        await queryRunner.query(`ALTER TABLE \`author\` CHANGE \`dateOfBirth\` \`dateOfBirth\` date NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`book\` CHANGE \`cycleId\` \`cycleId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`book\` CHANGE \`authorId\` \`authorId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`mark\` CHANGE \`bookId\` \`bookId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`mark\` CHANGE \`userId\` \`userId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`dateOfBirth\` \`dateOfBirth\` date NULL DEFAULT 'NULL'`);
        await queryRunner.query(`DROP INDEX \`IDX_2e95cd0420389355700aced74e\` ON \`list_books_book\``);
        await queryRunner.query(`DROP INDEX \`IDX_a04c61705cb077caa8a4f092b3\` ON \`list_books_book\``);
        await queryRunner.query(`DROP TABLE \`list_books_book\``);
        await queryRunner.query(`DROP TABLE \`list\``);
    }
}
