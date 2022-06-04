import ffi from 'ffi-napi';
import ref from "ref-napi";

import ref_array_di from 'ref-array-di';
import ref_struct_di from 'ref-struct-di';
import struct from 'ref-struct-di';
import array from 'ref-array-di';

var ArrayType = ref_array_di(ref);
var StructType = ref_struct_di(ref);

export const U8array = ArrayType(ref.types.uint8);

export const DoggoStruct = StructType({
    device: 'void *',
    queue: 'void *'
});

export const BufferStruct = StructType({
    data: U8array,
    len: ref.types.ulong
});

export type BufferStructType = struct.StructObject<{
    data: array.TypedArray<number, number>;
    len: string | number;
}>

export const lib = ffi.Library(__dirname + '/../lib/libartist_doggo.so', {
    new_doggo: [DoggoStruct, []],
    bobfire: [BufferStruct, ['void *', BufferStruct]],
    free_buf: ['void', [BufferStruct]]
});

export const doggo = lib.new_doggo();


