import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { convertToPdf } from "./services/pdfApi";
import "fake-indexeddb/auto";

jest.mock("./services/pdfApi", () => ({
  convertToPdf: jest.fn(),
}));

//Not the best but fast workaround for IndexedDB
global.structuredClone = (val) => {
  return JSON.parse(JSON.stringify(val));
};

describe("App", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should convert text to PDF when "Convert to PDF" button is clicked', async () => {
    // Mock URL.createObjectURL
    global.URL.createObjectURL = jest.fn(() => "blob:mock-url");

    // Arrange
    const mockPdfBlob = new Blob(["Mock PDF"], { type: "application/pdf" });
    convertToPdf.mockResolvedValue(mockPdfBlob);

    render(<App />);

    const textInput = screen.getByRole("textbox");
    const convertButton = screen.getByRole("button", {
      name: /convert to pdf/i,
    });

    // Act
    await act(async () => {
      fireEvent.change(textInput, { target: { value: "Test text" } });
      userEvent.click(convertButton);
    });

    // Assert
    expect(convertToPdf).toHaveBeenCalledWith("Test text");
    expect(convertToPdf).toHaveBeenCalledTimes(1);

    // Check if pdf-viewer appear in the DOM
    const pdfViewer = screen.getByTestId("pdf-viewer");
    expect(pdfViewer).toBeInTheDocument();
    expect(pdfViewer.src).toBe("blob:mock-url");
  });
});
