import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { db } from "@/database/drizzle";
import { books as booksTable } from "@/database/schema";

const Page = async () => {
  // paginate books
  const books = await db.select().from(booksTable).limit(10);

  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">All Books</h2>
        <Button className="bg-primary-admin" asChild>
          <Link href="/admin/books/new" className="text-white">
            + Create a New Book
          </Link>
        </Button>
      </div>

      <div className="mt-7 w-full overflow-hidden">
        <table className="w-full min-h-[600px]">
          <thead>
            <tr>
              <th className="w-[20px]">No</th>
              <th className="w-[140px]">Title</th>
              <th className="w-[100px]">Author</th>
              <th className="w-[100px]">Genre</th>
              <th className="w-[20px]">Rating</th>
              <th className="w-[20px]">Total Copies</th>
              <th className="w-[20px]">Available Copies</th>
              <th className="w-[20px]">Action</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={book.id} className="border-b border-gray-200">
                <td className="text-center">{index + 1}</td>
                <td>{book.title.length > 27 ? book.title.slice(0, 27)+"..." : book.title}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td className="text-center">{book.rating}</td>
                <td className="text-center">{book.totalCopies}</td>
                <td className="text-center">{book.availableCopies}</td>
                <td className="text-center">
                    <a className="text-primary-admin" href={`/admin/books/${book.id}`}>Edit</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* page */}
        <div className="mt-7 flex justify-end gap-1">
          <Button className="bg-primary-admin p-2" asChild>
            <Link href="/admin/books?page=2" className="text-white">
              Next
            </Link>
          </Button>
          <Button className="bg-primary-admin p-2" asChild>
            <Link href="/admin/books?page=1" className="text-white">
              Prev
            </Link>
          </Button>
          <Button className="bg-primary-admin p-2" asChild>
            <Link href="/admin/books?page=3" className="text-white">
              Last
            </Link>
          </Button>
          </div>
      </div>
    </section>
  );
};

export default Page;
