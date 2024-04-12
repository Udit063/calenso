import React, { useEffect } from "react";
import { useBookingsQuery } from "../slices/bookingApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setBookings } from "../slices/bookingSlice";
import BookingCard from "./BookingCard";
import { RootState } from "../store";

function Bookings() {
  const dispatch = useDispatch();
  const { data: bookings = [], isLoading, isError } = useBookingsQuery();

  const selectedBooking = useSelector(
    (state: RootState) => state?.bookings?.bookings
  );

  useEffect(() => {
    const bookingArr = bookings?.bookings?.map((book) => book);
    dispatch(setBookings(bookingArr));
  }, [bookings, dispatch]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <div className="max-w-full px-2 pt-8 lg:px-6">
        <div className="flex items-center">
          <header className="flex w-full max-w-full items-center truncate">
            <div className="w-full truncate ltr:mr-4 rtl:ml-4 md:block">
              <h3 className="font-heading max-w-28 sm:max-w-72 md:max-w-80 text-mainText truncate font-semibold tracking-wide sm:text-xl md:block xl:max-w-full text-xl hidden">
                Bookings
              </h3>
              <p
                className="font-heading text-mainText hidden text-sm md:block"
                data-testid="subtitle"
              >
                See upcoming and past events booked through your event type
                links.
              </p>
            </div>
          </header>
        </div>
        <div className="mt-16">
          <div className="flex flex-col">
            <div className="flex flex-row flex-wrap justify-between">
              <div className="mb-4 h-9 max-w-full lg:mb-5">
                <nav className="flex max-h-9 space-x-12 rounded-md">
                  <a
                    className="bg-emphasis text-emphasis inline-flex items-center justify-center md:mb-0 px-4 py-2.5 text-sm "
                    href="/"
                  >
                    <div className="flex items-center gap-x-2 font-heading text-mainText">
                      {" "}
                      Upcoming
                    </div>
                  </a>
                  <a
                    className="bg-emphasis text-emphasis inline-flex items-center justify-center md:mb-0 px-4 py-2.5 text-sm "
                    href="/"
                  >
                    <div className="flex items-center gap-x-2 font-heading text-mainText">
                      {" "}
                      Past
                    </div>
                  </a>
                  <a
                    className="bg-emphasis text-emphasis inline-flex items-center justify-center md:mb-0 px-4 py-2.5 text-sm "
                    href="/"
                  >
                    <div className="flex items-center gap-x-2 font-heading text-mainText">
                      {" "}
                      Cancelled
                    </div>
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </div>
        {isError ? (
          <p>Error fetching bookings: {isError.message}</p>
        ) : (
          <div>
            {selectedBooking && selectedBooking.length > 0 ? (
              selectedBooking.map((booking) => (
                <div key={booking._id}>
                  <BookingCard booking={booking} />
                </div>
              ))
            ) : (
              <main className="w-full">
                <div className="flex w-full flex-col relative;">
                  <div className="flex items-center justify-center pt-2 xl:pt-0">
                    <div className="flex w-full select-none flex-col items-center justify-center rounded-lg p-7 lg:p-20 border-subtle border border-dashed">
                      <div className="bg-emphasis flex h-[72px] w-[72px] items-center justify-center rounded-full text-mainText">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-default inline-block h-10 w-10 stroke-[1.3px]"
                        >
                          <rect
                            width="18"
                            height="18"
                            x="3"
                            y="4"
                            rx="2"
                            ry="2"
                          ></rect>
                          <line x1="16" x2="16" y1="2" y2="6"></line>
                          <line x1="8" x2="8" y1="2" y2="6"></line>
                          <line x1="3" x2="21" y1="10" y2="10"></line>
                        </svg>
                      </div>
                      <div className="flex max-w-[420px] flex-col items-center">
                        <h2 className="font-heading text-mainText text-center text-xl mt-6">
                          No upcoming bookings
                        </h2>
                        <div className="font-heading text-mainText mb-8 mt-8 text-center text-sm font-normal leading-6 opacity-80">
                          You have no upcoming bookings. As soon as someone
                          books a time with you it will show up here.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Bookings;
