import createStore from "../src/index";
const push = ({ value }, nextValue) => [...value, nextValue];

let store = null;

beforeEach(() => {
  store = createStore({
    users: ["a", "z", "u"],
    time: "",
    session: "token"
  });
});

it("store created", () => {
  expect(store.getState("users")).toEqual(["a", "z", "u"]);
});

it("pushUser", () => {
  const pushUser = store.createAction("users", push);
  pushUser("test");
  expect(store.getState("users")).toEqual(["a", "z", "u", "test"]);
});

it("subscribe", () => {
  const pushUser = store.createAction("users", push);

  const obj = {
    handler: ({ value }) => {
      obj.value = value;
    }
  };
  store.subscribe(obj.handler, ["users"]);

  pushUser("test");
  expect(obj.value).toEqual(["a", "z", "u", "test"]);
});

it("unsubscribe", () => {
  const pushUser = store.createAction("users", push);

  const obj = {
    handler: ({ value }) => {
      obj.value = value;
    }
  };
  store.subscribe(obj.handler, ["users"]);
  store.unsubscribe(obj.handler, ["users"]);

  pushUser("test");
  expect(obj.value).toEqual(["a", "z", "u"]);
});
