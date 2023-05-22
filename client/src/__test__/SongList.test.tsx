import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SongList, {
  DELETE_MUTUATION,
  GET_SONGS_LIST,
} from "../component/SongList";
import * as Graphql from "@apollo/client";
import { MockedProvider } from "@apollo/client/testing";
import { MemoryRouter } from "react-router-dom";

// beforeEach(() => {
//   jest.spyOn(Graphql, "useQuery").mockImplementation(
//     jest.fn().mockReturnValue({
//       data: {
//         songs: [
//           {
//             id: "62e7c60b626bae42416a828a",
//             title: "how",
//             __typename: "SongType",
//           },
//         ],
//       },
//     })
//   );
// });

afterEach(() => {
  // restore the spy created with spyOn
  jest.restoreAllMocks();
});

test("renders learn react link", async () => {
  const mocks = [
    {
      request: {
        query: GET_SONGS_LIST,
      },
      result: {
        data: {
          songs: [
            {
              id: "62e7c60b626bae42416a828a",
              title: "how",
              __typename: "SongType",
            },
          ],
        },
        loading: true,
        error: {},
      },
    },
  ];
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter>
        <SongList />
      </MemoryRouter>
    </MockedProvider>
  );
  expect(await screen.findByText("Loading...")).toBeInTheDocument();
  //   expect(screen.queryByText(/Loading.../)).not.toBeInTheDocument();
  //   const linkElement = screen.getByText("Songs List");
  //   expect(linkElement).toBeInTheDocument();
});

test("should show error UI", async () => {
  const dogMock = {
    request: {
      query: GET_SONGS_LIST,
    },
    loading: false,
    error: new Error("An error occurred"),
  };
  render(
    <MockedProvider mocks={[dogMock]} addTypename={false}>
      <MemoryRouter>
        <SongList />
      </MemoryRouter>
    </MockedProvider>
  );
  expect(await screen.findByText("An error occurred")).toBeInTheDocument();
});

it("should render without error", () => {
  render(
    <MockedProvider mocks={[]} addTypename={false}>
      <MemoryRouter>
        <SongList />
      </MemoryRouter>
    </MockedProvider>
  );
});

it("should render loading and success states on delete", async () => {
  jest.spyOn(Graphql, "useQuery").mockImplementation(
    jest.fn().mockReturnValue({
      data: {
        songs: [
          {
            id: "62e7c60b626bae42416a828a",
            title: "how",
            __typename: "SongType",
          },
        ],
      },
    })
  );
  //   const mutation = jest
  //     .fn()
  //     .mockImplementation(() =>
  //       Promise.resolve({ data: { xAssignment: { success: true } } })
  //     ); //new Promise(jest.fn());
  const refetch = jest.fn();
  //   jest
  //     .spyOn(Graphql, "useMutation")
  //     .mockImplementation(
  //       jest.fn().mockReturnValue([mutation().then(() => refetch())])
  //     );
  const mocks = [
    {
      request: {
        query: GET_SONGS_LIST,
      },
      result: {
        data: {
          songs: [
            {
              id: "62e7c60b626bae42416a828a",
              title: "how",
              __typename: "SongType",
            },
          ],
        },
        loading: false,
        error: {},
        refetch: () => {},
      },
    },
    {
      request: {
        query: DELETE_MUTUATION,
      },

      result: () => {
        const refech = jest.fn;
        refech();
        return {
          data: {
            songs: [
              {
                id: "62e7c60b626bae42416a828a",
                title: "how",
                __typename: "SongType",
              },
            ],
          },
          loading: false,
          error: {},
          onCompleted: () => {
            refetch();
          },
        };
      },
      onCompleted: () => {
        refetch();
      },
    },
  ];

  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter>
        <SongList />
      </MemoryRouter>
    </MockedProvider>
  );
  // Find the button element...
  const button = screen.getByTestId("delete");
  userEvent.click(button); // Simulate a click and fire the mutation

  //   expect(await screen.findByText("Loading...")).not.toBeInTheDocument();
  //   expect(await screen.findByText("Deleted!")).toBeInTheDocument();
});
