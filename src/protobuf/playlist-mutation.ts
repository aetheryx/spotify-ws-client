/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal.js";

export const protobufPackage = "";

export interface Item {
  uri: string;
  attributes: Item_Attributes | undefined;
}

export interface Item_Attributes {
  addedBy: string;
  timestamp: number;
}

export interface Op {
  kind: Op_Kind;
  added: Op_Added | undefined;
  removed: Op_Removed | undefined;
  moved: Op_Moved | undefined;
}

export enum Op_Kind {
  Unknown = 0,
  Add = 2,
  Remove = 3,
  Move = 4,
  UpdateItemAttributes = 5,
  UpdateListAttributes = 6,
  UNRECOGNIZED = -1,
}

export function op_KindFromJSON(object: any): Op_Kind {
  switch (object) {
    case 0:
    case "Unknown":
      return Op_Kind.Unknown;
    case 2:
    case "Add":
      return Op_Kind.Add;
    case 3:
    case "Remove":
      return Op_Kind.Remove;
    case 4:
    case "Move":
      return Op_Kind.Move;
    case 5:
    case "UpdateItemAttributes":
      return Op_Kind.UpdateItemAttributes;
    case 6:
    case "UpdateListAttributes":
      return Op_Kind.UpdateListAttributes;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Op_Kind.UNRECOGNIZED;
  }
}

export function op_KindToJSON(object: Op_Kind): string {
  switch (object) {
    case Op_Kind.Unknown:
      return "Unknown";
    case Op_Kind.Add:
      return "Add";
    case Op_Kind.Remove:
      return "Remove";
    case Op_Kind.Move:
      return "Move";
    case Op_Kind.UpdateItemAttributes:
      return "UpdateItemAttributes";
    case Op_Kind.UpdateListAttributes:
      return "UpdateListAttributes";
    case Op_Kind.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface Op_Added {
  index: number;
  items: Item[];
}

export interface Op_Removed {
  index: number;
  length: number;
  items: Item[];
}

export interface Op_Moved {
  fromIndex: number;
  length: number;
  toIndex: number;
  items: Item[];
}

export interface PlaylistMutation {
  uri: string;
  ops: Op[];
}

function createBaseItem(): Item {
  return { uri: "", attributes: undefined };
}

export const Item = {
  encode(message: Item, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.uri !== "") {
      writer.uint32(10).string(message.uri);
    }
    if (message.attributes !== undefined) {
      Item_Attributes.encode(message.attributes, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Item {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseItem();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.uri = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.attributes = Item_Attributes.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Item {
    return {
      uri: isSet(object.uri) ? String(object.uri) : "",
      attributes: isSet(object.attributes) ? Item_Attributes.fromJSON(object.attributes) : undefined,
    };
  },

  toJSON(message: Item): unknown {
    const obj: any = {};
    message.uri !== undefined && (obj.uri = message.uri);
    message.attributes !== undefined &&
      (obj.attributes = message.attributes ? Item_Attributes.toJSON(message.attributes) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<Item>, I>>(base?: I): Item {
    return Item.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Item>, I>>(object: I): Item {
    const message = createBaseItem();
    message.uri = object.uri ?? "";
    message.attributes = (object.attributes !== undefined && object.attributes !== null)
      ? Item_Attributes.fromPartial(object.attributes)
      : undefined;
    return message;
  },
};

function createBaseItem_Attributes(): Item_Attributes {
  return { addedBy: "", timestamp: 0 };
}

export const Item_Attributes = {
  encode(message: Item_Attributes, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.addedBy !== "") {
      writer.uint32(10).string(message.addedBy);
    }
    if (message.timestamp !== 0) {
      writer.uint32(16).int64(message.timestamp);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Item_Attributes {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseItem_Attributes();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.addedBy = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.timestamp = longToNumber(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Item_Attributes {
    return {
      addedBy: isSet(object.addedBy) ? String(object.addedBy) : "",
      timestamp: isSet(object.timestamp) ? Number(object.timestamp) : 0,
    };
  },

  toJSON(message: Item_Attributes): unknown {
    const obj: any = {};
    message.addedBy !== undefined && (obj.addedBy = message.addedBy);
    message.timestamp !== undefined && (obj.timestamp = Math.round(message.timestamp));
    return obj;
  },

  create<I extends Exact<DeepPartial<Item_Attributes>, I>>(base?: I): Item_Attributes {
    return Item_Attributes.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Item_Attributes>, I>>(object: I): Item_Attributes {
    const message = createBaseItem_Attributes();
    message.addedBy = object.addedBy ?? "";
    message.timestamp = object.timestamp ?? 0;
    return message;
  },
};

function createBaseOp(): Op {
  return { kind: 0, added: undefined, removed: undefined, moved: undefined };
}

export const Op = {
  encode(message: Op, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.kind !== 0) {
      writer.uint32(8).int32(message.kind);
    }
    if (message.added !== undefined) {
      Op_Added.encode(message.added, writer.uint32(18).fork()).ldelim();
    }
    if (message.removed !== undefined) {
      Op_Removed.encode(message.removed, writer.uint32(26).fork()).ldelim();
    }
    if (message.moved !== undefined) {
      Op_Moved.encode(message.moved, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Op {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOp();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.kind = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.added = Op_Added.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.removed = Op_Removed.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.moved = Op_Moved.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Op {
    return {
      kind: isSet(object.kind) ? op_KindFromJSON(object.kind) : 0,
      added: isSet(object.added) ? Op_Added.fromJSON(object.added) : undefined,
      removed: isSet(object.removed) ? Op_Removed.fromJSON(object.removed) : undefined,
      moved: isSet(object.moved) ? Op_Moved.fromJSON(object.moved) : undefined,
    };
  },

  toJSON(message: Op): unknown {
    const obj: any = {};
    message.kind !== undefined && (obj.kind = op_KindToJSON(message.kind));
    message.added !== undefined && (obj.added = message.added ? Op_Added.toJSON(message.added) : undefined);
    message.removed !== undefined && (obj.removed = message.removed ? Op_Removed.toJSON(message.removed) : undefined);
    message.moved !== undefined && (obj.moved = message.moved ? Op_Moved.toJSON(message.moved) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<Op>, I>>(base?: I): Op {
    return Op.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Op>, I>>(object: I): Op {
    const message = createBaseOp();
    message.kind = object.kind ?? 0;
    message.added = (object.added !== undefined && object.added !== null)
      ? Op_Added.fromPartial(object.added)
      : undefined;
    message.removed = (object.removed !== undefined && object.removed !== null)
      ? Op_Removed.fromPartial(object.removed)
      : undefined;
    message.moved = (object.moved !== undefined && object.moved !== null)
      ? Op_Moved.fromPartial(object.moved)
      : undefined;
    return message;
  },
};

function createBaseOp_Added(): Op_Added {
  return { index: 0, items: [] };
}

export const Op_Added = {
  encode(message: Op_Added, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.index !== 0) {
      writer.uint32(8).int32(message.index);
    }
    for (const v of message.items) {
      Item.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Op_Added {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOp_Added();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.index = reader.int32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.items.push(Item.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Op_Added {
    return {
      index: isSet(object.index) ? Number(object.index) : 0,
      items: Array.isArray(object?.items) ? object.items.map((e: any) => Item.fromJSON(e)) : [],
    };
  },

  toJSON(message: Op_Added): unknown {
    const obj: any = {};
    message.index !== undefined && (obj.index = Math.round(message.index));
    if (message.items) {
      obj.items = message.items.map((e) => e ? Item.toJSON(e) : undefined);
    } else {
      obj.items = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Op_Added>, I>>(base?: I): Op_Added {
    return Op_Added.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Op_Added>, I>>(object: I): Op_Added {
    const message = createBaseOp_Added();
    message.index = object.index ?? 0;
    message.items = object.items?.map((e) => Item.fromPartial(e)) || [];
    return message;
  },
};

function createBaseOp_Removed(): Op_Removed {
  return { index: 0, length: 0, items: [] };
}

export const Op_Removed = {
  encode(message: Op_Removed, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.index !== 0) {
      writer.uint32(8).int32(message.index);
    }
    if (message.length !== 0) {
      writer.uint32(16).int32(message.length);
    }
    for (const v of message.items) {
      Item.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Op_Removed {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOp_Removed();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.index = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.length = reader.int32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.items.push(Item.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Op_Removed {
    return {
      index: isSet(object.index) ? Number(object.index) : 0,
      length: isSet(object.length) ? Number(object.length) : 0,
      items: Array.isArray(object?.items) ? object.items.map((e: any) => Item.fromJSON(e)) : [],
    };
  },

  toJSON(message: Op_Removed): unknown {
    const obj: any = {};
    message.index !== undefined && (obj.index = Math.round(message.index));
    message.length !== undefined && (obj.length = Math.round(message.length));
    if (message.items) {
      obj.items = message.items.map((e) => e ? Item.toJSON(e) : undefined);
    } else {
      obj.items = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Op_Removed>, I>>(base?: I): Op_Removed {
    return Op_Removed.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Op_Removed>, I>>(object: I): Op_Removed {
    const message = createBaseOp_Removed();
    message.index = object.index ?? 0;
    message.length = object.length ?? 0;
    message.items = object.items?.map((e) => Item.fromPartial(e)) || [];
    return message;
  },
};

function createBaseOp_Moved(): Op_Moved {
  return { fromIndex: 0, length: 0, toIndex: 0, items: [] };
}

export const Op_Moved = {
  encode(message: Op_Moved, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.fromIndex !== 0) {
      writer.uint32(8).int32(message.fromIndex);
    }
    if (message.length !== 0) {
      writer.uint32(16).int32(message.length);
    }
    if (message.toIndex !== 0) {
      writer.uint32(24).int32(message.toIndex);
    }
    for (const v of message.items) {
      Item.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Op_Moved {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOp_Moved();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.fromIndex = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.length = reader.int32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.toIndex = reader.int32();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.items.push(Item.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Op_Moved {
    return {
      fromIndex: isSet(object.fromIndex) ? Number(object.fromIndex) : 0,
      length: isSet(object.length) ? Number(object.length) : 0,
      toIndex: isSet(object.toIndex) ? Number(object.toIndex) : 0,
      items: Array.isArray(object?.items) ? object.items.map((e: any) => Item.fromJSON(e)) : [],
    };
  },

  toJSON(message: Op_Moved): unknown {
    const obj: any = {};
    message.fromIndex !== undefined && (obj.fromIndex = Math.round(message.fromIndex));
    message.length !== undefined && (obj.length = Math.round(message.length));
    message.toIndex !== undefined && (obj.toIndex = Math.round(message.toIndex));
    if (message.items) {
      obj.items = message.items.map((e) => e ? Item.toJSON(e) : undefined);
    } else {
      obj.items = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Op_Moved>, I>>(base?: I): Op_Moved {
    return Op_Moved.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Op_Moved>, I>>(object: I): Op_Moved {
    const message = createBaseOp_Moved();
    message.fromIndex = object.fromIndex ?? 0;
    message.length = object.length ?? 0;
    message.toIndex = object.toIndex ?? 0;
    message.items = object.items?.map((e) => Item.fromPartial(e)) || [];
    return message;
  },
};

function createBasePlaylistMutation(): PlaylistMutation {
  return { uri: "", ops: [] };
}

export const PlaylistMutation = {
  encode(message: PlaylistMutation, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.uri !== "") {
      writer.uint32(10).string(message.uri);
    }
    for (const v of message.ops) {
      Op.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PlaylistMutation {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePlaylistMutation();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.uri = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.ops.push(Op.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PlaylistMutation {
    return {
      uri: isSet(object.uri) ? String(object.uri) : "",
      ops: Array.isArray(object?.ops) ? object.ops.map((e: any) => Op.fromJSON(e)) : [],
    };
  },

  toJSON(message: PlaylistMutation): unknown {
    const obj: any = {};
    message.uri !== undefined && (obj.uri = message.uri);
    if (message.ops) {
      obj.ops = message.ops.map((e) => e ? Op.toJSON(e) : undefined);
    } else {
      obj.ops = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PlaylistMutation>, I>>(base?: I): PlaylistMutation {
    return PlaylistMutation.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<PlaylistMutation>, I>>(object: I): PlaylistMutation {
    const message = createBasePlaylistMutation();
    message.uri = object.uri ?? "";
    message.ops = object.ops?.map((e) => Op.fromPartial(e)) || [];
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

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new tsProtoGlobalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
