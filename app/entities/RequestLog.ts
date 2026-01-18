import { Entity, PrimaryKey, Property } from '@mikro-orm/core';


@Entity()
export class RequestLog {
@PrimaryKey()
id!: number;


@Property()
method!: string;


@Property()
url!: string;


@Property({ type: 'json', nullable: true })
headers?: Record<string, string>;


@Property({ type: 'json', nullable: true })
body?: Record<string, unknown>;


@Property()
status!: number;


@Property()
createdAt: Date = new Date();
}