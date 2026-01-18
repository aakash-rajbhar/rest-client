import { MikroORM } from '@mikro-orm/core';
import { SqliteDriver } from '@mikro-orm/sqlite';
import { RequestLog } from '../entities/RequestLog';

let orm: MikroORM<SqliteDriver>;

export async function getORM() {
  if (!orm) {
    orm = await MikroORM.init<SqliteDriver>({
      entities: [RequestLog],
      dbName: 'requests.db',
      driver: SqliteDriver,
    });

    await orm.getSchemaGenerator().updateSchema();
  }

  return orm;
}
