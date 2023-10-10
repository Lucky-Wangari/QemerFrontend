import React from "react";

export interface ColumnType {
    title: string;
    key:string;
    render?: (column:ColumnType, item:ColumnType)=>React.ReactNode
  }