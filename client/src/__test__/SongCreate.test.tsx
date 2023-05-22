import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { render, screen, fireEvent } from "@testing-library/react";
import SongCreate, { ADD_SONG } from "../component/SongCreate";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

const renderMethod = (
  mocks: readonly MockedResponse<Record<string, any>>[] | undefined
) => {
  render(
    <MockedProvider mocks={mocks}>
      <MemoryRouter>
        <SongCreate />
      </MemoryRouter>
    </MockedProvider>
  );
};

describe("render SongCreate component", () => {
  test("should render compoent", () => {
    const mocks = [
      {
        request: {
          query: ADD_SONG,
        },
      },
    ];
    renderMethod(mocks);
    const screenText = screen.getByText("Create a new Song");
    expect(screenText).toBeInTheDocument();
  });

  test("should render onchange input", () => {
    renderMethod([]);
    // Find the input element...
    const input: HTMLInputElement = screen.getByLabelText("song-title");
    // const typIn = userEvent.type(input, 'input')
    fireEvent.change(input); // Simulate a click and fire the mutation
    fireEvent.change(input, { target: { value: "Good Day" } });

    expect(input.value).toBe("Good Day");
    // expect(input.nodeValue).toBe(null);
  });

  test("should render click onSbumit", () => {
    const onSubmit = jest.fn();
    renderMethod([]);
    const input = screen.getByLabelText("song-title");
    fireEvent.change(input, { target: { value: "Good Day" } });

    const form = screen.getByLabelText("form-submit");
    // userEvent.type(screen.getByLabelText("song-title"), 'hello')
    userEvent.click(form);
    fireEvent.submit(screen.getByLabelText("form-submit", {}));
    expect(onSubmit).toHaveBeenCalledTimes(0);
  });
});
