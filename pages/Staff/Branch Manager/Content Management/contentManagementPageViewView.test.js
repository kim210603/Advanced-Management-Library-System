import { populateTable, populateDropdowns, showMessage, branches } from 'C:\Users\Sara\StudioProjects\student_crud\Advanced-Management-Library-System\pages\Staff\Branch Manager\Content Management\contentManagementPageViewView.html';


jest.mock("https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js", () => ({
  getDatabase: jest.fn(),
  ref: jest.fn(),
  onValue: jest.fn(),
  update: jest.fn(),
}));


beforeEach(() => {
  document.body.innerHTML = `
    <main>
        <div class="wrapper">
            <h1>Inventory Table</h1>
            <div class="table-container">
                <div class="table-scroll">
                    <table id="mediaTable">
                        <thead>
                            <tr>
                                <th>Date Stored</th>
                                <th>Media ID</th>
                                <th>Media Name</th>
                                <th>Branch ID</th>
                                <th>Branch Name</th>
                                <th>Branch Postcode</th>
                                <th>Media Type</th>
                                <th>Genre</th>
                                <th>Media Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
                <button class="Transferbutton">Transfer Media</button>
            </div>
        </div>
    </main>
    <div class="messageContainer"></div>
    <form id="transferMediaForm">
        <select id="mediaID"></select>
        <select id="branchID"></select>
        <select id="branchIDto"></select>
    </form>
  `;
});

describe("Content Management Tests", () => {
  it("should populate the table correctly", () => {
    const data = {
      1: {
        DateStored: "2025-01-01",
        MediaID: "101",
        MediaName: "Movie A",
        BranchID: "1",
        BranchName: "Sheffield Central",
        BranchPostcode: "S1 1AA",
        MediaType: "DVD",
        Genre: "Action",
        MediaQuantity: 10,
      },
    };
    populateTable(data);
    const tableBody = document.querySelector("#mediaTable tbody");
    expect(tableBody.rows.length).toBe(1);
    expect(tableBody.rows[0].cells[1].textContent).toBe("101");
    expect(tableBody.rows[0].cells[2].textContent).toBe("Movie A");
  });

  it("should populate the dropdowns correctly", () => {
    const data = {
      1: { MediaID: "101", BranchID: "1" },
      2: { MediaID: "102", BranchID: "2" },
    };
    populateDropdowns(data);
    const mediaDropdown = document.getElementById("mediaID");
    const branchDropdown = document.getElementById("branchID");
    expect(mediaDropdown.children.length).toBe(3); 
    expect(branchDropdown.children.length).toBe(3); 
  });

  it("should show a success message", () => {
    document.body.innerHTML = '<div class="messageContainer"></div>';
    showMessage("Transfer successful!", "success");
    const messageContainer = document.querySelector(".messageContainer");
    expect(messageContainer.textContent).toBe("Transfer successful!");
    expect(messageContainer.firstChild.classList.contains("success")).toBe(true);
  });

  it("should show an error message", () => {
    document.body.innerHTML = '<div class="messageContainer"></div>';
    showMessage("Error occurred", "error");
    const messageContainer = document.querySelector(".messageContainer");
    expect(messageContainer.textContent).toBe("Error occurred");
    expect(messageContainer.firstChild.classList.contains("error")).toBe(true);
  });
});
