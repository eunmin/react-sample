# React's diff 알고리즘 - Christopher Chedeau

React는 페이스북에서 만든 UI를 만들기 위한 자바스크립트 라이브러리다.
React는 처음부터 성능을 고려해서 설계되었다.
이 글에서는 React의 diff 알고리즘과 랜더링 방식에 대해서 설명한다.
이 글을 보고 나면 React를 사용해서 웹 사이트를 만들 때 랜더링 성능을 최적화 할 수 있을 것이다.

## Diff 알고리즘

자세한 내용을 알아보기 전에 React가 어떻게 동작하는지 대강 알아보자.

```javascript
var MyComponent = React.createClass(
  { render: function() {
    if (this.props.first) {
      return <div className="first"><span>A Span</span></div>;
    }
    else {
      return <div className="second"><p>A Paragraph</p></div>;
    }
  }
});
```

At any point in time, you describe how you want your UI to look like.
이것은 랜더링 결과가 실제 DOM 노드가 아니라는 것을 이해하기 위해 중요하다.
이것은 가벼운 자바스크립트 객체이고 vitual DOM이라고 부른다.

### 단계별로

임의의 두 트리의 최소의 변경된 갯수를 찾는 것은 O(n^3) 문제이다.
생각하는 것과 같이 우리의 경우에는 다루기 쉽지 않다.
React는 O(n)에 가깝게 이 문제를 단순하고 강력하게 해결한다.

 
