import fs from 'fs';
import path from 'path';
import { Readable } from 'stream';
import { finished } from 'stream/promises';

const screens = [
  {
    name: 'IGTS_Home',
    codeUrl: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1Njk0YTUwMjdkZjMwOTM0Zjc0YzA2MjZkNTQyEgsSBxCwgfuSzBoYAZIBIwoKcHJvamVjdF9pZBIVQhM1NzMxODU0MzU5NDg2NzcxMDMx&filename=&opi=89354086',
    imgUrl: 'https://lh3.googleusercontent.com/aida/AP1WRLsFM0a_EAQIV0GtgSUeAY9ZHsU62SjwSnKZCMGKfTTpKQV7d_obxOKWSJ6ls-Z1djyJDK7VAg5_88Mv8K-DEZeWvrPPEshqYn476a23WLC_Qu4nKvBo1bQkqKC3sm_EeJIHE1IxK2qLyLxWNqo0GKS1VbWFb8-fzP1-zakGeZGpmQ-1759PMTK0kP0Y5Y2FX_dsspr0dC06ojDaw7EKlID1P0hQX9xsHdxpBY4inHs7tXetgRp-Fr5JBQc'
  },
  {
    name: 'The_Ledger',
    codeUrl: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1Njk0YTRlNWI2MjEwNTQ5YzVjZjNjMTk2OTIwEgsSBxCwgfuSzBoYAZIBIwoKcHJvamVjdF9pZBIVQhM1NzMxODU0MzU5NDg2NzcxMDMx&filename=&opi=89354086',
    imgUrl: 'https://lh3.googleusercontent.com/aida/AP1WRLsKkOEBoFyJZZr3Rk1Bt3MtLG7BphnDHpCIZtfGdJF-N1n4TkW51C_37JKmc-UTaxdbqyJy66LDM0chgNh1ier_J21OOnfoqBdfHK3NM7GYvzMDQ9HrAR5FiWQ7Nbv6yHpmInd7PWvgxP8qHnf-VaCxL7hZLBshDGPX3wTn_gq-I1mcPJ9hmRsMpfWNR9OGzi0i0GaZL6pEPCe4EKhj0A23lPqaTyFQjXHLwnysgm4ERLxJpbm6lLdBFw'
  },
  {
    name: 'The_Game_Lab',
    codeUrl: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1Njk0YTRmODJhM2MwODE2ZWZlMTQyMTExNDBkEgsSBxCwgfuSzBoYAZIBIwoKcHJvamVjdF9pZBIVQhM1NzMxODU0MzU5NDg2NzcxMDMx&filename=&opi=89354086',
    imgUrl: 'https://lh3.googleusercontent.com/aida/AP1WRLsPi0wEy5yVzkXOWpNML2M25p2D2VkT46sEMFp3b-klx4xqLNC2WNTVABvbfUWZoW5S6PlFPYQknv2grohxPwTqhmoEdceCBWzUlj3i5uBLhI5F8lipNWFHHYyro45Bp0baYoE0YOEoVjDyX0QgU-rpq-YMPzdnfd8XTOkzaUL6IYyuQk7d47qaXDo9UHYmld2eIfYBe9IwZo4BxbSNeiQ99pMmOqUeeomdwybW8j6hG9GmWA5l422FrhQ'
  },
  {
    name: 'Join_the_Society',
    codeUrl: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1Njk0YTQ4NWU3YTgwMWVlNjk2NjMzMTRmOTI4EgsSBxCwgfuSzBoYAZIBIwoKcHJvamVjdF9pZBIVQhM1NzMxODU0MzU5NDg2NzcxMDMx&filename=&opi=89354086',
    imgUrl: 'https://lh3.googleusercontent.com/aida/AP1WRLum2DuPST496CC0NGBW6twweW1sl8GF92y3pZBU__zYwKEXdrsF5g5hurg-yRcitIzKISmxKcxx_JOmuA5dNNNbmk80AziLZ6gddcQHigTloVhsFFN67oivWadrk8ErQbDbPeHelRPfJ868WLYMOjWewz7SSPw9y30ChP0vUKuIHCveyzJomwjaupxt9zAsSSlcDqBZr3rrfEWUCCb71A3mlMeUL-Kr-0_re9jIDmOj2SZpHPH5ChMwsR4'
  },
  {
    name: 'Society_Roster',
    codeUrl: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1Njk0YTRjYTdkNzAwMjA3OTAzNWRhMDYzOGJkEgsSBxCwgfuSzBoYAZIBIwoKcHJvamVjdF9pZBIVQhM1NzMxODU0MzU5NDg2NzcxMDMx&filename=&opi=89354086',
    imgUrl: 'https://lh3.googleusercontent.com/aida/AP1WRLumnsY1cfvYjprBvLiVQ8_YkQK76v5owpw13JkfYO_7rqBmDJYHE0nnfPAF-M10szgpUFBvrgrM1EZsITLKA1SmH7ngyL4fx6D89IPO8aLzdkSKROKw5roY__G08LYfFe3Yyuf1T34rUx5t2JSWqongVWpyVU9K92QybYfK_Vpvny4HYtJOwHylWt9o354XLI_2dMzzDMPE87B4HChhsln0BiL0OCNkTjSIo-2-kX57nL9SC4UUAVmECIk'
  }
];

const outDir = path.join(process.cwd(), 'stitch-designs');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function downloadFile(url, fileName) {
  const res = await fetch(url);
  const dest = fs.createWriteStream(path.join(outDir, fileName));
  await finished(Readable.fromWeb(res.body).pipe(dest));
  console.log(`Downloaded ${fileName}`);
}

async function main() {
  for (const screen of screens) {
    console.log(`Downloading ${screen.name}...`);
    await downloadFile(screen.codeUrl, `${screen.name}.html`);
    await downloadFile(screen.imgUrl, `${screen.name}.png`);
  }
  console.log('All downloads completed!');
}

main().catch(console.error);
