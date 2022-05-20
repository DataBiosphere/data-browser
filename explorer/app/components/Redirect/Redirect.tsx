import { useRouter } from "next/router";
import React, { useEffect } from "react";

interface RedirectProps {
  replace?: boolean;
  destination: string;
}

export const Redirect: React.FC<RedirectProps> = ({ destination, replace }) => {
  const router = useRouter();

  useEffect(() => {
    replace ? router.replace(destination) : router.push(destination);
  }, [destination, replace, router]);

  return <></>;
};
