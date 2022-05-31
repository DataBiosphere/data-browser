import { useRouter } from "next/router";
import React, { useEffect } from "react";

interface RedirectProps {
  replace?: boolean;
  destination: string;
}

export const Redirect = ({
  destination,
  replace,
}: RedirectProps): JSX.Element => {
  const router = useRouter();

  useEffect(() => {
    replace ? router.replace(destination) : router.push(destination);
  }, [destination, replace, router]);

  return <></>;
};
