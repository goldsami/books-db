const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class createMarkTable1635362573079 {
    name = 'createMarkTable1635362573079'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`mark\` (\`id\` int NOT NULL AUTO_INCREMENT, \`value\` int NOT NULL, \`userId\` int NULL, \`bookId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`mark\` ADD CONSTRAINT \`FK_38375646905f9876844d328da90\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`mark\` ADD CONSTRAINT \`FK_30ead57baee3ff76494b836fab7\` FOREIGN KEY (\`bookId\`) REFERENCES \`book\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`mark\` DROP FOREIGN KEY \`FK_30ead57baee3ff76494b836fab7\``);
        await queryRunner.query(`ALTER TABLE \`mark\` DROP FOREIGN KEY \`FK_38375646905f9876844d328da90\``);
        await queryRunner.query(`DROP TABLE \`mark\``);
    }
}
