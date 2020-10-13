# Nest

## 第一步

### 介绍

Nest 是一个用于构建高效，可扩展的 Node.js 服务器端应用程序的框架, 基于 TypeScript 开发的, 对 TypeScrpt 支持非常好。

Nest 是基于[装饰器(decorators)](https://github.com/tc39/proposal-decorators)语言特性而创建的。 这个既是优点也是缺点, 优点是通过装饰器对常用代码抽象后, 代码更加简洁; 缺点就是装饰器语法提案还没有定案, 如果装饰器语法有变动, Nest框架可能也要重写。

Nest 框架底层 HTTP 平台支持：Express 和 Fastify, 默认是基于 Express 实现的。Nest 在这些框架之上提供了一定程度的抽象，同时也将其 API 直接暴露给开发人员。这样可以轻松使用基于 Express 开发的第三方模块。

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

```bash
# 使用 CLI 快速创建 modules
nest g modules user

# 简写
nest g mo user
```


## 中间件(Middleware)

中间件是在路由处理程序 之前 调用的函数。 中间件函数可以访问请求和响应对象，以及应用程序请求响应周期中的 next() 中间件函数。 next() 中间件函数通常由名为 next 的变量表示。

Nest 中间件实际上等价于 Express 中间件。

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

内置的异常层负责处理整个应用程序中的所有抛出的异常。当捕获到未处理的异常时，最终用户将收到友好的响应。

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

管道有两个类型:

* 转换：管道将输入数据转换为所需的数据输出
* 验证：对输入数据进行验证，如果验证成功继续传递; 验证失败则抛出异常;

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

拦截器具有一系列有用的功能，这些功能受面向切面编程（AOP）技术的启发。它们可以：

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



