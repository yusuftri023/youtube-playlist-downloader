async function main(numberOfFiles) {
  for (let i = 0; i <= numberOfFiles; i++) {
    const dots = ".".repeat(i);
    const left = numberOfFiles - i;
    const empty = " ".repeat(left);

    /* need to use  `process.stdout.write` becuase console.log print a newline character */
    /* \r clear the current line and then print the other characters making it looks like it refresh*/

    process.stdout.write(
      `\r[${dots}${empty}] ${((i * 100) / numberOfFiles).toFixed(2)}%`
    );

    await wait(100);
  }
}

main(30);

function wait(ms) {
  return new Promise((res) => setTimeout(res, ms));
}
