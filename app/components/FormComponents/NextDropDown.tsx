"use client";

import { Dropdown } from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function NextDefaultFunction({
  selected,
  disabled = false,
  options,
  setter,
}: any) {
  useEffect(() => {
    console.log(selected);
  }, [selected]);
  return (
    <>
      <Dropdown isDisabled={disabled}>
        <Dropdown.Button flat={false} color={"primary"}>
          {selected}
        </Dropdown.Button>
        <Dropdown.Menu
          variant={"solid"}
          color={"primary"}
          onAction={(keys) => {
            setter(keys);
          }}
        >
          {options.map((item: any) => (
            <Dropdown.Item key={item.key}>{item.name}</Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}
