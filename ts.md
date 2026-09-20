# TypeScript

## 1. TypeScript 怎么扩展基础类型？extends 怎么用？

1. **扩展对象接口用 `extends`**：保留基础接口字段，再增加新字段，适合公共信息加业务字段。
2. **组合对象类型可以用 `&`**：表示同时满足两边的要求，不是像对象赋值那样后面的字段覆盖前面。
3. **同名字段要兼容**：接口继承时不能随意把 `string` 改成 `number`；交叉类型中的冲突属性可能变成 `never`。
4. **需要替换字段时先排除**：可以用 `Omit` 去掉原字段，再声明新的类型。
5. **基本类型不能像对象接口一样加字段**：如果题目说“基础属性”，先确认指基础对象还是 `string`、`number` 这样的原始类型。

```ts
interface BaseUser {
  id: number;
  name: string;
}

interface Admin extends BaseUser {
  permissions: string[];
}

type UserWithAge = BaseUser & { age: number };
type StringIdUser = Omit<BaseUser, 'id'> & { id: string };
```

参考：[TypeScript 对象类型](https://www.typescriptlang.org/docs/handbook/2/objects)。

## 2. extends 除了继承还有什么用途？

1. **约束泛型**：`T extends { id: number }` 表示传入的类型至少要有一个数字类型的 `id`。
2. **条件类型**：`T extends U ? A : B` 表示根据类型能否赋给另一种类型，选择不同的结果类型。
3. **类继承**：`class Child extends Parent` 会继承运行时的类行为，与只在编译期存在的接口继承不同。
4. **不要理解成必须完全相等**：泛型约束满足必要结构即可，还可以带其他字段。

```ts
function getId<T extends { id: number }>(value: T): number {
  return value.id;
}
getId({ id: 1, name: '小明' });
```

## 3. interface 和 type 的区别

1. **描述对象时都能用**：都可以声明属性、方法和可选字段。
2. **interface 支持声明合并**：同名接口可以合并，但重复属性的声明必须兼容，不能随便改类型。
3. **type 能表达更多组合**：可以定义联合类型、元组、基本类型别名、条件类型等。
4. **扩展方式不同**：interface 常用 `extends`，type 常用交叉类型 `&`。
5. **项目保持一致即可**：对象契约可以用 interface，复杂类型运算用 type，不用强行规定所有地方只能用一种。

## 4. any、unknown、never 的区别

1. **`any` 相当于绕过很多类型检查**：可以随意读属性、调用方法，容易让类型错误继续传播。
2. **`unknown` 表示暂时不知道类型**：任何值都可以赋给它，但读取属性或运算前需要先检查类型。
3. **`never` 表示不可能出现的值**：例如总是抛出异常的函数返回类型，或已经排除所有分支后的类型。
4. **外部数据优先谨慎处理**：接口、用户输入等可以先看作 unknown，再做运行时校验，而不是直接写 any。

```ts
function printValue(value: unknown) {
  if (typeof value === 'string') {
    console.log(value.toUpperCase());
  }
}
```

## 5. 泛型有什么用？

1. **复用逻辑，同时保留类型关系**：不必为字符串、数字各写一套函数，也不用把类型全部变成 any。
2. **让输入和输出关联起来**：传入 `User[]`，返回值就能推断成 User，而不是一个模糊的类型。
3. **可以给泛型加约束**：明确需要哪些字段或能力，函数内部才可以安全使用。
4. **泛型不是越多越好**：只有需要表达类型之间的关系时再加，简单函数使用明确类型更清楚。

```ts
function first<T>(items: T[]): T | undefined {
  return items[0]; // 空数组可能没有第一项
}
const value = first(['Vue', 'React']); // string | undefined
```

## 6. 联合类型和交叉类型有什么区别？

1. **联合 `A | B` 是满足其中一种**：例如一个值可能是字符串，也可能是数字。
2. **交叉 `A & B` 是同时满足两种**：例如既有用户基本信息，又有权限字段。
3. **联合类型先判断再操作**：不能直接使用只属于某个分支的方法，可以用 `typeof`、`in` 或标识字段缩小范围。
4. **对象联合适合表达状态**：通过 `status` 区分成功、失败，让不同状态拥有不同字段。

```ts
type Result =
  | { status: 'success'; data: string[] }
  | { status: 'error'; message: string };

function handle(result: Result) {
  if (result.status === 'success') {
    console.log(result.data);
  } else {
    console.log(result.message);
  }
}
```

## 7. 常用工具类型有哪些？

1. **`Partial<T>`**：把顶层属性变成可选，适合描述部分更新参数。
2. **`Required<T>`**：把顶层可选属性改成必填。
3. **`Pick<T, K>` 和 `Omit<T, K>`**：分别是挑选字段、排除字段。
4. **`Readonly<T>`**：在类型检查层面禁止修改顶层属性，不会自动在运行时冻结对象。
5. **`Record<K, V>`**：描述一组键对应某种值，例如 `Record<string, number>`。
6. **`ReturnType<F>`、`Parameters<F>`**：取得函数的返回值类型和参数元组类型。`Awaited<T>` 可取得 Promise 解包后的类型。

## 8. keyof 和 typeof 怎么用？

1. **`keyof` 取得类型的键**：例如 `keyof User` 可以得到 `'id' | 'name'`。
2. **类型位置的 `typeof` 从变量取类型**：适合已有配置对象，不想再重复写一份类型。
3. **和泛型结合保证访问合法字段**：让 key 只能来自对象本身，避免拼错属性名。
4. **区分运行时 `typeof`**：JavaScript 表达式里的 `typeof value` 返回字符串；类型位置的 `typeof value` 用于编译期类型推导。

```ts
function getValue<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
const name = getValue({ id: 1, name: '小明' }, 'name');
```

## 9. 类型断言能保证接口数据正确吗？

1. **不能**：`as User` 只是告诉编译器按 User 看待数据，不会检查或转换运行时内容。
2. **接口和类型通常会被擦除**：浏览器执行的仍是 JavaScript，错误数据不会因为写了接口就自动被拦下。
3. **外部输入需要运行时校验**：检查字段是否存在、类型和取值是否正确，可以手写判断，也可以使用校验库。
4. **少用非空断言 `!`**：它不会在运行时补出一个值；确实可能为空时，应明确处理空值分支。

## 10. 可选属性和 readonly 有什么区别？

1. **`name?: string` 表示字段可以缺省**：读取时通常要考虑 undefined，再决定是否使用。
2. **`readonly id: number` 表示不允许通过该类型重新赋值**：不等于可选，也不等于运行时不可变。
3. **只读通常是浅层的**：只读属性指向一个普通对象时，对象内部字段不一定只读。
4. **默认值和判断要明确**：可以用 `??` 处理 null、undefined；如果使用 `||`，空字符串、0、false 也可能被替换。
