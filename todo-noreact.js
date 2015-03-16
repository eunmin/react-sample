// TodoModel
function TodoModel(text) {
  this.items = [];

  // Common Model
  this.observers = [];
}

// Common Model
TodoModel.prototype.addObserver = function(observer) {
  this.observers.push(observer);
};

TodoModel.prototype.addTodo = function(text) {
  this.items.push(text);
  this.notifyChanged();
};

// Common Model
TodoModel.prototype.notifyChanged = function() {
  var i = 0
    , length = this.observers.length;

  for (i = 0; i < length; i++) {
    this.observers[i].onChange();
  }
}

// TodoView
// Common View
function TodoView(mountNode, model) {
  this.mountNode = mountNode;
  this.model = model;
}

TodoView.prototype.render = function() {
  var i = 0
    , itemCount = this.model.items.length
    , listNode = $("<ul/>");

  this.mountNode.empty();

  this.mountNode.append($("<h3/>").text("TODO"));
  this.mountNode.append(listNode);
  this.mountNode.append(
    $("<div/>").append($("<form/>")
                  .append($("<input>").attr("id", "textTodo")
                                      .attr("type", "text"))
                  .append($("<input>").attr("id", "btnAdd")
                                      .attr("type", "button")
                                      .attr("value", "Add #"
                                            + (itemCount + 1)))));

  for(i = 0; i < itemCount; i++) {
    listNode.append($("<li/>").text(this.model.items[i]));
  }
};

// TodoController
// Common Controller
function TodoController(model, view) {
  this.model = model;
  this.view = view;
  this.view.model = model;

  this.model.addObserver(this);
  this.model.notifyChanged();
}

TodoController.prototype.bindEvent = function() {
  var that = this;

  $("#btnAdd").click(function() {
    that.model.addTodo($("#textTodo").val());
  });
};

// Common Controller
TodoController.prototype.onChange = function() {
  this.view.render();
  this.bindEvent();
};

// Main
$(document).ready(function() {
  new TodoController(new TodoModel(), new TodoView($("#todo")));
});
