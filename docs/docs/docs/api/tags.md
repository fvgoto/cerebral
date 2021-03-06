# Tags
Tags allows you to target things in Cerebral. They are based on [template literal tags](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_template_literals). They can be used by **operators**, **connect** and **compute**. Some of them can also be used with other Cerebral modules. The great thing about tags is their composability. For example:

```js
state`items.${state`currentItemKey`}`

state`items.${input`itemKey`}`
```

This allows you to express signals and component dependencies a lot more effectively. There are 5 tags in Cerebral.

- **state** - Used in signals and connect to target state
- **input** - Used in signals to target input
- **props** - Used in connect to target component props
- **signal** - Used in signals and connect to target a signal
- **string** - Used in signals to evaluate a composed string
