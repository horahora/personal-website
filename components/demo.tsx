import { useEffect } from "react";

export default function Demo() {
  useEffect(() => {
    console.log("from demo");
  }, []);
}
