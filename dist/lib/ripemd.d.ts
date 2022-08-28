export declare class Ripemd160 {
    #private;
    get blockSize(): number;
    digest(): any[];
    update(msg: Uint8Array | number[]): this;
}
