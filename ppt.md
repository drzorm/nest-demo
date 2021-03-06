# Nest

## 第一步

### 介绍

Nest 是一个用于构建高效，可扩展的 Node.js 服务器端应用程序的框架, 基于 TypeScript 开发的, 完美支持 TypeScrpt。

Nest 是基于[装饰器(decorators)](https://github.com/tc39/proposal-decorators)语言特性而创建的。 这个既是优点也是缺点, 优点是通过装饰器对常用代码抽象后, 代码非常简洁; 缺点就是装饰器语法提案还没有定案, 如果装饰器语法有变动, Nest框架可能也要重写。

Nest 框架底层 HTTP 平台支持：Express 和 Fastify, 默认是基于 Express 实现的。Nest 在这些框架之上提供了一定程度的抽象，同时也将其 API 直接暴露给开发人员。可以使用 Express 的所有中间件。

### 环境

Node.js(>=10.13.0)


### 安装

```bash
# 通过脚手架全局安装 cli
yarn global add @nestjs/cli

# 通过 cli 创建项目
nest new project-name
```


### 核心文件

main.ts	应用程序入口文件。它使用 NestFactory 用来创建 Nest 应用实例。
app.controller.ts	带有单个路由的基本控制器示例。
app.module.ts	应用程序的根模块。
app.service.ts	应用程序的根服务。

## 控制器(Controllers)

控制器负责处理传入的 请求 和向客户端返回 响应 。
每个控制器可以设置有多个路由，不同的路由可以执行不同的操作。
通过在 @Controller('prefix') 装饰器中设置路径前缀，避免每个路由设置重复的路径。

![Controllers](https://docs.nestjs.com/assets/Controllers_1.png)

```bash
# 使用 CLI 快速创建 Controllers
nest g controller user

# 简写
nest g co user
```


## 提供者(Providers)

Providers 是 Nest 的一个基本概念。许多基本的 Nest 类可能被视为 provider - service, repository, factory, helper 等等。 他们都可以通过 constructor 注入依赖关系。 这意味着对象可以彼此创建各种关系，并且“连接”对象实例的功能在很大程度上可以委托给 Nest运行时系统。 Provider 只是一个用 @Injectable() 装饰器注释的类。

![Providers](https://docs.nestjs.com/assets/Components_1.png)

```bash
# 使用 CLI 快速创建 service
nest g service user

# 简写
nest g s user
```

## 模块(Modules)

模块是具有 @Module() 装饰器的类。 @Module() 装饰器提供了元数据，Nest 用它来组织应用程序结构。

每个 Nest 应用程序至少有一个模块，即根模块(对应 demo 中 app.module.ts)。

![Modules](https://docs.nestjs.com/assets/Modules_1.png)


```ts
// 定义一个 module，在 imports 中可以注入其他模块，在 prividers 注入相应的在控制器中需要用到的 service，在 controllers 中注入需要的 controller
@Module({
  imports: [TypeOrmModule.forFeature([User]), otherModule],
  providers: [UserService],
  controllers: [UserController],
})

export class UserModule {}
```

```bash
# 使用 CLI 快速创建 modules
nest g modules user

# 简写
nest g mo user
```


## 中间件(Middleware)

中间件是在路由处理程序 之前 调用的函数。 中间件函数可以访问请求和响应对象，以及应用程序请求响应周期中的 next() 中间件函数。 next() 中间件函数通常由名为 next 的变量表示。

Nest 的中间件跟 Express 的中间件一模一样, 在 Nest 项目中可以直接使用 Express 中的中间件。

中间件函数可以执行以下任务:

* 执行任何代码。
* 对请求和响应对象进行更改。
* 结束请求-响应周期。
* 调用堆栈中的下一个中间件函数。
* 如果当前的中间件函数没有结束请求-响应周期, 它必须调用 next() 将控制传递给下一个中间件函数。否则, 请求将被挂起。

![Middleware](https://docs.nestjs.com/assets/Middlewares_1.png)

```bash
# 使用 CLI 快速创建 middleware
nest g middleware logger

# 简写
nest g mi logger
```

## 异常过滤器(Exception filters)

异常过滤器可以捕获在后端接受处理任何阶段所跑出的异常，捕获到异常后，然后返回处理过的异常结果给客户端（比如返回错误码，错误提示信息等等）。

![Exception filters](https://docs.nestjs.com/assets/Filter_1.png)

```bash
# 使用 CLI 快速创建 filters
nest g filters http-exception

# 简写
nest g f http-exception
```


## 管道(Pipes)

管道是具有 @Injectable() 装饰器的类。管道应实现 PipeTransform 接口。

![Pipes](https://docs.nestjs.com/assets/Pipe_1.png)

管道有两个形式:

* 转换数据：管道将输入数据转换为所需的数据输出
* 验证数据：对输入数据进行验证，如果验证成功继续传递; 验证失败则抛出异常;

在这两种情况下, 管道 参数(arguments) 会由 控制器(controllers)的路由处理程序 进行处理. Nest 会在调用这个方法之前插入一个管道，管道会先拦截方法的调用参数,进行转换或是验证处理，然后用转换好或是验证好的参数调用原方法

```bash
# 使用 CLI 快速创建 pipe
nest g pipe validate

# 简写
nest g pi validate
```

## 守卫(Guards)

守卫是一个使用 @Injectable() 装饰器的类。 守卫应该实现 CanActivate 接口。

![Guards](https://docs.nestjs.com/assets/Guards_1.png)

守卫有一个单独的责任。它们根据运行时出现的某些条件（例如权限，角色，访问控制列表等）来确定给定的请求是否由路由处理程序处理。 这通常称为授权。在传统的 Express 应用程序中，通常由中间件处理授权。中间件是身份验证的良好选择。到目前为止，访问限制逻辑大多在中间件内。这样很好，因为诸如 token 验证或将 request 对象附加属性与特定路由没有强关联。

```bash
# 使用 CLI 快速创建 guard
nest g guard auth

# 简写
nest g gu auth
```

## 拦截器(Interceptors)

拦截器是使用 @Injectable() 装饰器注解的类。拦截器应该实现 NestInterceptor 接口。

![Interceptors](https://docs.nestjs.com/assets/Interceptors_1.png)

拦截器具有一系列有用的功能：

* 在函数执行之前/之后绑定额外的逻辑
* 转换从函数返回的结果
* 转换从函数抛出的异常
* 扩展基本函数行为
* 根据所选条件完全重写函数 (例如, 缓存目的)

```bash
# 使用 CLI 快速创建 interceptor
nest g interceptor logging

# 简写
nest g gu logging
```

## nest generate alias

| name | alias |
| ---- | ---- |
| application | application |
| class | cl |
| configuration | config |
| <b>controller</b> | co |
| decorator | d |
| <b>filter</b> | f |
| gateway | ga |
| <b>guard</b> | gu |
| <b>interceptor</b> | in |
| interface | interface |
| <b>middleware</b> | mi |
| <b>module</b> | mo |
| <b>pipe</b> | pi |
| provider | pr |
| resolver | r |
| <b>service</b> | s |
| library | lib |
| sub-app | app |
| resource | res |

---

## 简单的CURD示例

>

1. 创建并启动项目[(git项目地址)](http://git.rongsitech.com:8002/zhangbl/nestjs-demo)

```bash
# 通过脚手架全局安装 cli
yarn global add @nestjs/cli

# 通过 cli 创建项目
nest new nest-demo

# 安装依赖
yarn

# 启动项目
yarn start
```

2. 创建 user 模块文件

```bash
# 创建 user.module.ts
# 通过 cli 创建 user.module.ts, 程序会自动在 app.module.ts 中导入 UserModule,
nest g mo user

# 创建 user.controller.ts
nest g co user

# 创建 user.service.ts
nest g s user

```

2. 安装数据库相关依赖, 为了方便快速演示, 数据库使用了 [SQLite](https://www.sqlite.org/download.html) + [TypeORM](https://github.com/typeorm/typeorm#readme)

```bash
# 安装数据库相关依赖
yarn add sqlite3 typeorm @nestjs/typeorm
```

```ts
// 在 app.module.ts 中导入 typeOrmModule
// 需要在项目根目录下创建 db.sqlite 数据库文件
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      synchronize: true,
      logging: true,
      entities: [`${__dirname}/**/*.entity.{js,ts}`]
    })
  ]
})
```

3. 创建实体

> 在 typeORM 中数据库的表对应的就是一个类，通过定义一个类来创建实体。实体（Entity）是一个映射到数据库表的类，通过@Entity()来标记。

```ts
// user.entity.ts
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;
}
```

4. 完善service

```ts
// user.service.ts
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';

import { Injectable } from '@nestjs/common';

import { CreateUserDto, UpdateUserDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  async create(user: CreateUserDto): Promise<InsertResult> {
    return await User.insert(user);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await User.delete(id);
  }

  async update(user: UpdateUserDto): Promise<UpdateResult> {
    return await User.update(user.id, user);
  }

  async find(id: number): Promise<User> {
    return await User.findOne({ id });
  }

  async findAll(): Promise<User[]> {
    return await User.find();
  }
}
```

5. 完善controller

```ts
// user.controller.ts
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

import { CreateUserDto, UpdateUserDto } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() user: CreateUserDto) {
    return this.userService.insert(user);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.userService.delete(id);
  }

  @Put(':id')
  updateUser(@Param('id') id: number, @Body() user: UpdateUserDto) {
    return this.userService.update({ id, ...user });
  }

  @Get(':id')
  getUser(@Param('id') id: number): Promise<User> {
    return this.userService.find(id);
  }

  @Get()
  getUsers(): Promise<User[]> {
    return this.userService.findAll();
  }
}
```

