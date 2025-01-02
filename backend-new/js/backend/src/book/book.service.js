"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const common_1 = require("@nestjs/common");
let BookService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var BookService = _classThis = class {
        constructor(prisma) {
            this.prisma = prisma;
        }
        createBook(user_id, createBookDto) {
            return __awaiter(this, void 0, void 0, function* () {
                const { title, description, genre, pages, progress, author } = createBookDto;
                // Create a book in db
                const book = yield this.prisma.book.create({
                    data: {
                        user_id,
                        title,
                        description,
                        genre,
                        pages,
                        progress,
                        author,
                    },
                });
                return {
                    message: 'Book created successfully!',
                    data: book,
                };
            });
        }
        getBooks(user_id) {
            return __awaiter(this, void 0, void 0, function* () {
                const books = yield this.prisma.book.findMany({
                    where: { user_id },
                });
                return {
                    data: books,
                };
            });
        }
        ;
        getBookByID(book_id) {
            return __awaiter(this, void 0, void 0, function* () {
                const id = parseInt(book_id, 10); // Make sure id is a number
                if (isNaN(id)) {
                    throw new common_1.HttpException('Invalid Book ID', common_1.HttpStatus.BAD_REQUEST);
                }
                const book = yield this.prisma.book.findFirst({
                    where: { id }
                });
                if (!book) {
                    throw new common_1.HttpException('Book not found', common_1.HttpStatus.NOT_FOUND);
                }
                return {
                    data: book
                };
            });
        }
        ;
        getLastReadBook(userID) {
            return __awaiter(this, void 0, void 0, function* () {
                const user_id = parseInt(userID, 10);
                if (isNaN(user_id)) {
                    throw new common_1.HttpException('Invalid User ID', common_1.HttpStatus.BAD_REQUEST);
                }
                const books = yield this.getBooks(user_id);
                if (!books.data || books.data.length === 0) {
                    throw new common_1.HttpException('No books found for this user', common_1.HttpStatus.NOT_FOUND);
                }
                const lastReadBook = books.data.reduce((latest, current) => {
                    return new Date(latest.updatedAt) > new Date(current.updatedAt) ? latest : current;
                });
                return {
                    data: lastReadBook
                };
            });
        }
        updateBook(book_id, updateBookDto) {
            return __awaiter(this, void 0, void 0, function* () {
                const id = parseInt(book_id, 10); // Make sure id is a number
                if (isNaN(id)) {
                    throw new common_1.HttpException('Invalid Book ID', common_1.HttpStatus.BAD_REQUEST);
                }
                const existingBook = yield this.prisma.book.findFirst({
                    where: { id }
                });
                if (!existingBook) {
                    throw new common_1.HttpException('Book not found', common_1.HttpStatus.NOT_FOUND);
                }
                const updatedBook = yield this.prisma.book.update({
                    where: { id },
                    data: updateBookDto,
                });
                return {
                    message: "Book updated successfully",
                    data: updatedBook,
                };
            });
        }
        deleteBook(book_id) {
            return __awaiter(this, void 0, void 0, function* () {
                const id = parseInt(book_id, 10); // Make sure id is a number
                if (isNaN(id)) {
                    throw new common_1.HttpException('Invalid Book ID', common_1.HttpStatus.BAD_REQUEST);
                }
                const existingBook = yield this.prisma.book.findFirst({
                    where: { id }
                });
                if (!existingBook) {
                    throw new common_1.HttpException('Book not found', common_1.HttpStatus.NOT_FOUND);
                }
                ;
                const deletedBook = yield this.prisma.book.delete({
                    where: { id }
                });
                return {
                    message: "Book deleted successfully!",
                    data: deletedBook
                };
            });
        }
    };
    __setFunctionName(_classThis, "BookService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        BookService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return BookService = _classThis;
})();
exports.BookService = BookService;
