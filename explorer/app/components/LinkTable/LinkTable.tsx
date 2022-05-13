/**
 * Simple component to represent a list of Links. Although called table,
 * this component actually creates an unordered list (<ul>)
 */
import Link from "next/link";
import React from "react";

interface LinkTableProps {
  items: {
    label: string;
    url: string;
  }[];
}

export const LinkTable = ({ items }: LinkTableProps) => {
  return (
    <div>
      <ul>
        {items.map((item) => (
          <li key={item.url}>
            <Link href={item.url}>
              <a>{item.label}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
