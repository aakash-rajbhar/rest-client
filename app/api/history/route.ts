import { NextResponse } from 'next/server';
import { getORM } from '../../lib/mikroorm';
import { RequestLog } from '../../entities/RequestLog';


export async function GET(req: Request) {
const { searchParams } = new URL(req.url);
const page = Number(searchParams.get('page') || 1);
const limit = 10;


const orm = await getORM();
const em = orm.em.fork();


const [items, total] = await em.findAndCount(RequestLog, {}, {
limit,
offset: (page - 1) * limit,
orderBy: { createdAt: 'DESC' },
});


return NextResponse.json({ items, total, page });
}