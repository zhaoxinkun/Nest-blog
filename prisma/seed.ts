// 首次播种
import * as bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { Random } from 'mockjs';
import _ from 'lodash';

const prisma = new PrismaClient();


const salt = bcrypt.genSaltSync(10);


async function run() {
  await prisma.user.create({
    data: {
      name: 'akin',
      password: await bcrypt.hash('123456', salt),
      email: '1213787373@qq.com',
      role: 'admin',
    },
  });

  for (let i = 1; i <= 5; i++) {
    await prisma.category.create({
      data: {
        title: Random.ctitle(3, 6),
      },
    });
  }

  for (let i = 0; i < 50; i++) {
    await prisma.article.create({
      data: {
        title: Random.ctitle(10, 30),
        content: Random.cparagraph(30, 50),
        categoryId: _.random(1, 5),
      },
    });
  }
}

run().catch(console.error);