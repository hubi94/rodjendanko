const fn = () => {
  console.log("uradio sam nesto");
};

const nestoTamo = (refNaFunkciju) => {
  console.log("Upravo cu pozvati ref na fn: ", refNaFunkciju.toString());
  console.log(refNaFunkciju());
};

const onClick = (ref) => {
  // ** kada se desi zapravo click dogadjaj
  ref();
};

console.log("Nesto se desava...");
console.log("Jos nesto");
nestoTamo(fn);
