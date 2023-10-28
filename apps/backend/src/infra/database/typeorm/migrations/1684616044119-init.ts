import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1684616044119 implements MigrationInterface {
  name = 'Init1684616044119';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "resource" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "description" character varying, "url" character varying NOT NULL, "access_token" character varying, "check_frequency" integer NOT NULL, "status" character varying, "last_checked" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT '"2023-05-20T20:54:04.423Z"', "notify_to" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_e2894a5867e06ae2e8889f1173f" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "resource"`);
  }
}
