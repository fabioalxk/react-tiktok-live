import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHelloWorld } from "../redux/actions/session";

function Home() {
  const dispatch = useDispatch();
  const hello = useSelector((state) => state.session.hello);

  function handleHelloWorld() {
    dispatch(getHelloWorld());
  }
  return (
    <>
      <div>Hello World</div>
      <button onClick={() => handleHelloWorld()}>Get Hello World</button>
      <div>output: {hello}</div>
    </>
  );
}

export default Home;
