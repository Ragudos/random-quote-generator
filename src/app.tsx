import { Button } from "./components/button";
import { useTheme } from "./context/theme-provider";
import "./styles/globals.css";
import { useFetch } from "./useFetch";

const API_ROUTE = import.meta.env.VITE_QUOTES_API_ROUTE as string;

export default function App() {
  const { theme, changeTheme } = useTheme();
  const { data, isFetching, isLoading, fetchError, getData } = useFetch(
    `${API_ROUTE}/random`,
  );

  return (
    <>
      <header className="sticky p-8">
        <nav className="container flex-justify-between">
          <a href="/" title="Random Quote Generator Home">
            <h1>Random Quote Generator</h1>
          </a>
          <Button
            variant="outline"
            color="monochromatic"
            size="medium"
            roundness="somewhat-round"
            onClick={() => {
              changeTheme(theme === "dark" ? "light" : "dark");
            }}
          >
            Click to change theme
          </Button>
        </nav>
      </header>
      <main>
        <div
          id="quote-box"
          className="main-container container flex-justify-center flex-col"
        >
          <div>
            <article>
              {data && !isLoading && !isFetching && !fetchError ? (
                <>
                  <p id="text" style={{ width: "100%" }}>
                    {data?.content}
                  </p>
                  <div
                    style={{ width: "100%" }}
                    className="flex-justify-between"
                  >
                    <div>
                      - by <cite id="author">{data?.author}</cite>
                    </div>
                    <time dateTime={new Date(data?.dateAdded).toISOString()}>
                      Written last:{" "}
                      {new Date(data?.dateAdded).toLocaleDateString("en-us", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                </>
              ) : null}
              {isFetching ? <p>Fetching quote...</p> : null}

              {isLoading ? <p>Loading quote...</p> : null}

              {fetchError ? <p>Error fetching quote. Try again.</p> : null}
            </article>
          </div>
          <section
            style={{ padding: "0 1rem" }}
            className="flex-justify-between"
          >
            <div>
              <a
                id="tweet-quote"
                className="share-link"
                href={`http://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${encodeURIComponent(
                  `${data?.content} Written by ${data?.author} last ${
                    data &&
                    new Date(data.dateAdded).toLocaleDateString("en-us", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  }.`,
                )}`}
                title={`Share quote ${
                  data ? `by ${data?.author}` : ""
                } on twitter`}
                target="_blank"
              >
                <img src="/twitter.png" alt="twitter-icon" />
              </a>
            </div>
            <div>
              <Button
                variant="default"
                color="secondary"
                size="medium"
                roundness="somewhat-round"
                id="new-quote"
                onClick={() => {
                  getData();
                }}
              >
                Generate Quote
              </Button>
            </div>
          </section>
        </div>
      </main>
      <footer>
        <div className="flex-justify-between container">
          <h6>
            Built by&nbsp;
            <a href="https://youtube.com/@programmers_sanctuary" title="See my YouTube" className="primary">
              Programmer's Sanctuary
            </a>
            &nbsp;for FreeCodeCamp course.
            View it on <a href="https://github.com/Ragudos/random-quote-generator.git">Github</a>.
          </h6>

          <section>
            <a
              className="primary"
              href="https://www.flaticon.com/free-icons/twitter"
              title="twitter icons"
            >
              Twitter icons created by Pixel perfect - Flaticon
            </a>
          </section>
        </div>
      </footer>
    </>
  );
}
