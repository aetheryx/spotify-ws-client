/* eslint-disable */
import _m0 from "protobufjs/minimal.js";

export const protobufPackage = "";

export interface LikesMutationItem {
  identifier: Buffer;
  removed: boolean;
}

export interface LikesMutation {
  items: LikesMutationItem[];
}

function createBaseLikesMutationItem(): LikesMutationItem {
  return { identifier: Buffer.alloc(0), removed: false };
}

export const LikesMutationItem = {
  encode(message: LikesMutationItem, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.identifier.length !== 0) {
      writer.uint32(18).bytes(message.identifier);
    }
    if (message.removed === true) {
      writer.uint32(48).bool(message.removed);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LikesMutationItem {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLikesMutationItem();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          if (tag !== 18) {
            break;
          }

          message.identifier = reader.bytes() as Buffer;
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.removed = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LikesMutationItem {
    return {
      identifier: isSet(object.identifier) ? Buffer.from(bytesFromBase64(object.identifier)) : Buffer.alloc(0),
      removed: isSet(object.removed) ? Boolean(object.removed) : false,
    };
  },

  toJSON(message: LikesMutationItem): unknown {
    const obj: any = {};
    message.identifier !== undefined &&
      (obj.identifier = base64FromBytes(message.identifier !== undefined ? message.identifier : Buffer.alloc(0)));
    message.removed !== undefined && (obj.removed = message.removed);
    return obj;
  },

  create<I extends Exact<DeepPartial<LikesMutationItem>, I>>(base?: I): LikesMutationItem {
    return LikesMutationItem.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<LikesMutationItem>, I>>(object: I): LikesMutationItem {
    const message = createBaseLikesMutationItem();
    message.identifier = object.identifier ?? Buffer.alloc(0);
    message.removed = object.removed ?? false;
    return message;
  },
};

function createBaseLikesMutation(): LikesMutation {
  return { items: [] };
}

export const LikesMutation = {
  encode(message: LikesMutation, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.items) {
      LikesMutationItem.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LikesMutation {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLikesMutation();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.items.push(LikesMutationItem.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LikesMutation {
    return { items: Array.isArray(object?.items) ? object.items.map((e: any) => LikesMutationItem.fromJSON(e)) : [] };
  },

  toJSON(message: LikesMutation): unknown {
    const obj: any = {};
    if (message.items) {
      obj.items = message.items.map((e) => e ? LikesMutationItem.toJSON(e) : undefined);
    } else {
      obj.items = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<LikesMutation>, I>>(base?: I): LikesMutation {
    return LikesMutation.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<LikesMutation>, I>>(object: I): LikesMutation {
    const message = createBaseLikesMutation();
    message.items = object.items?.map((e) => LikesMutationItem.fromPartial(e)) || [];
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var tsProtoGlobalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

function bytesFromBase64(b64: string): Uint8Array {
  if (tsProtoGlobalThis.Buffer) {
    return Uint8Array.from(tsProtoGlobalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = tsProtoGlobalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if (tsProtoGlobalThis.Buffer) {
    return tsProtoGlobalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(String.fromCharCode(byte));
    });
    return tsProtoGlobalThis.btoa(bin.join(""));
  }
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
