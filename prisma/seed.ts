// 首次播种
import * as bcrypt from 'bcryptjs';

import { PrismaClient } from '@prisma/client';
import { Random } from 'mockjs';

const prisma = new PrismaClient();


const salt = bcrypt.genSaltSync(10);


async function run() {
  await prisma.user.create({
    data: {
      name: 'akin',
      password: await bcrypt.hash('123456', salt),
      email: '1213787373@qq.com',
    },
  });

  for (let i = 0; i < 50; i++) {
    await prisma.article.create({
      data: {
        title: Random.ctitle(10, 30),
        content: Random.cparagraph(30, 50),
      },
    });
  }
}

run().catch(console.error);