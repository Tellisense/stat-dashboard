import { createAction } from "@reduxjs/toolkit";

export const apiRequest = createAction("api/callBegan");
export const apiSucceeded = createAction("api/callSuccess");
export const apiFailed = createAction("api/callFailed");
