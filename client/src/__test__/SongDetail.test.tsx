import { MockedResponse, MockedProvider } from "@apollo/client/testing";
import { MemoryRouter } from "react-router";
import SongDetail, { GET_SONGS_LIST } from "../component/SongDetail";
import { render, screen } from "@testing-library/react";

const renderMethod = (
  mocks: readonly MockedResponse<Record<string, any>>[] | undefined
) => {
  render(
    <MockedProvider mocks={mocks}>
      <MemoryRouter>
        <SongDetail />
      </MemoryRouter>
    </MockedProvider>
  );
};
describe("render Song detail component", () => {
  it("test song detail rendering", async () => {
    const mocks = [
      {
        request: {
          query: GET_SONGS_LIST,
          variables: { id: "62e7c60b626bae42416a828a" },
        },
        result: {
          data: {
            song: [
              {
                id: "62e7c60b626bae42416a828a",
                title: "how",
                lyrics: [{ id: "vdsfvsd", content: "helo", likes: 2 }],
                __typename: "SongType",
              },
            ],
          },
        },
      },
    ];
    renderMethod(mocks);
    expect(await screen.findByText("Error:")).toBeInTheDocument();

    // const screenText = screen.getByText("Back");
    // expect(screenText).toBeInTheDocument();
  });

  it("test song detail rendering with error", async () => {
    const mocks = [
      {
        request: {
          query: GET_SONGS_LIST,
          variables: { id: "62e7c60b626bae42416a828a" },
        },
        result: {
          data: {
            song: [
              {
                id: "62e7c60b626bae42416a828a",
                title: "how",
                lyrics: [{ id: "vdsfvsd", content: "helo", likes: 2 }],
                __typename: "SongType",
              },
            ],
          },
        },
        // error: new Error(),
      },
    ];
    renderMethod(mocks);
    expect(await screen.findByText("Error:")).toBeInTheDocument();

    // const screenText = screen.getByText("Back");
    // expect(screenText).toBeInTheDocument();
  });
});
