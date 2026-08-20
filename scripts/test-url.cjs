async function test() {
  try {
    const res = await fetch('https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png');
    console.log('Status:', res.status);
  } catch (e) {
    console.log('Error:', e.message);
  }
}
test();
