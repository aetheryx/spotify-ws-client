/* eslint-disable */
import _m0 from "protobufjs/minimal.js";

export const protobufPackage = "";

export interface LikedItem {
  id: string;
  removed: boolean;
}

export interface LikesMutation {
  likeItems: LikedItem[];
}

function createBaseLikedItem(): LikedItem {
  return { id: "", removed: false };
}

export const LikedItem = {
  encode(message: LikedItem, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    if (message.removed === true) {
      writer.uint32(48).bool(message.removed);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LikedItem {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLikedItem();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          if (tag !== 18) {
            break;
          }

          message.id = reader.string();
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

  fromJSON(object: any): LikedItem {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      removed: isSet(object.removed) ? Boolean(object.removed) : false,
    };
  },

  toJSON(message: LikedItem): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.removed !== undefined && (obj.removed = message.removed);
    return obj;
  },

  create<I extends Exact<DeepPartial<LikedItem>, I>>(base?: I): LikedItem {
    return LikedItem.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<LikedItem>, I>>(object: I): LikedItem {
    const message = createBaseLikedItem();
    message.id = object.id ?? "";
    message.removed = object.removed ?? false;
    return message;
  },
};

function createBaseLikesMutation(): LikesMutation {
  return { likeItems: [] };
}

export const LikesMutation = {
  encode(message: LikesMutation, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.likeItems) {
      LikedItem.encode(v!, writer.uint32(10).fork()).ldelim();
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

          message.likeItems.push(LikedItem.decode(reader, reader.uint32()));
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
    return {
      likeItems: Array.isArray(object?.likeItems) ? object.likeItems.map((e: any) => LikedItem.fromJSON(e)) : [],
    };
  },

  toJSON(message: LikesMutation): unknown {
    const obj: any = {};
    if (message.likeItems) {
      obj.likeItems = message.likeItems.map((e) => e ? LikedItem.toJSON(e) : undefined);
    } else {
      obj.likeItems = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<LikesMutation>, I>>(base?: I): LikesMutation {
    return LikesMutation.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<LikesMutation>, I>>(object: I): LikesMutation {
    const message = createBaseLikesMutation();
    message.likeItems = object.likeItems?.map((e) => LikedItem.fromPartial(e)) || [];
    return message;
  },
};

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
