const express = require("express");
const path = require("path");
const index = require("./index.js");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
  });
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "notes.html"));
  });

//express doc

// app.get("/api/notes", (req, res) => {
//     return res.json(waitlist);
// })
app.get("/api/dbjson", (req, res) => {
    return res.json(note);
})

app.post("/api/dbjson", (req, res) =>{
    const newNote = req.body 
      notes.push(newNote);
      res.json(true);
})


$(() => {
    renderNotes();
  
    $("#note-cards").on("click", ".delete", function () {
      const noteName = $(this).attr("data-notename");
      $.ajax({
        method: "DELETE",
        url: `/api/dbjson/${noteName}`,
      }).then(
        () => {
          renderNotes();
        },
        () => {
          alert("No note");
          renderNotes();
        }
      );

    });
  
    function renderNotes() {
      $.get("/api/characters", (notes) => {
        const container = $(".list-group");
        container.empty();
        notes.forEach((note) =>
          container.append(renderNoteCard(note))
        );
      });
    }
  
    function renderNoteCard(note) {
      return $(`
        <div class="card mb-2">
          <div class="card-body">
            <h2>${note.name}</h2>
            <button data-routename="${note.routeName}" class="btn btn-danger delete">
              <span class="fa fa-trash"></span> Delete
            </button>
          </div>
        </div>`);
    }
  });

app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
  });
