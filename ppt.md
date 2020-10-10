# Nest

## 第一步

### 介绍

Nest 是一个用于构建高效，可扩展的 Node.js 服务器端应用程序的框架。它使用渐进式 JavaScript，内置并完全支持 TypeScript（但仍然允许开发人员使用纯 JavaScript 编写代码）并结合了 OOP（面向对象编程），FP（函数式编程）和 FRP（函数式响应编程）的元素。

在底层，Nest使用强大的 HTTP Server 框架，如 Express（默认）和 Fastify。Nest 在这些框架之上提供了一定程度的抽象，同时也将其 API 直接暴露给开发人员。这样可以轻松使用每个平台的无数第三方模块。

Nest 提供了一个开箱即用的应用程序架构，允许开发人员和团队创建高度可测试，可扩展，松散耦合且易于维护的应用程序。


### 环境

Node.js(>=10.13.0)


### 安装

```bash
yarn global add @nestjs/cli
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
在 @Controller()装饰器中指定路径前缀，避免每个路由设置重复的路径。

```bash
# 使用 CLI 创建控制器
nest g controller user

# 简写
nest g co user
```


## Providers
## Modules
## Middleware
## Exception filters
## Pipes
## Guards
## Interceptors
## Custom decorators

