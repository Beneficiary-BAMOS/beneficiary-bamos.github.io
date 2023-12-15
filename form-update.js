// Import the Supabase client
//firstLoad = true;


if (window.performance && window.performance.navigation.type === 2) {
  window.location.reload();
}
// Replace 'YOUR_SUPABASE_URL' and 'YOUR_SUPABASE_KEY' with your Supabase project URL and API key
const supabaseUrl = 'https://hzyiqzmdkocpumguttzb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6eWlxem1ka29jcHVtZ3V0dHpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA1Mzc5OTMsImV4cCI6MjAxNjExMzk5M30.-JNHzAkpBh_EN99ZiYGbu1q4ZsRSE3WapgBRMPrkiZs';

// Create a Supabase client
const database = supabase.createClient(supabaseUrl, supabaseKey);

// Function to check the connection status and show an alert
async function checkConnection() {
  try {
    // Try to make a request to Supabase to check the connection
    //let { data, error } = await database.from('testing').select().eq('id', userData.id).limit(1).single();
    var { data, error } = await database.from('testing').select(` 
      *,
      kalusuganBuntis ( * ),
      kalusuganPWD ( * ),
      miyembro ( * ),
      nutrisyon ( * ),
      pangkabuhayan ( * ),
      panlipunan ( * )
    `).eq('id', userData.id).limit(1).single();

    console.log(data);

    const eMiyembro = data.miyembro[data.miyembro.length-1];

    $('#fullname').val(eMiyembro.pinuno);
    $('#completeAdd').val(eMiyembro.nakatira);
    $('#relations').val(eMiyembro.sinoka);
    $('#houseNum').val(eMiyembro.bahayNumero);
    $('#birthD').val(eMiyembro.isinilang);
    $(`.member-gender-box [value="${eMiyembro.kasarian}"]`).prop('checked',true);
    $(`input[name="isEmployee"][value="${eMiyembro.Employed.toLowerCase()}"]`).prop('checked',true);
    $('#sitio').val(parseInt(eMiyembro.Sitio));
    $('#purok').val(parseInt(eMiyembro.Purok));
   

    eMiyembro.Family_members.forEach((member,key) => {
        let famAddBlock = `
      
        <!-- Container -->
      
        <div class="input-box member family-member ">   

                                              <label>Family member </label>
                                              <input type="text" placeholder="Member" name="fmember${key+1}" value="${member.name}" required/>
                            <div class="column">
                                              <input type="date" placeholder="Date of birth" name="fbday${key+1}" value="${member.birthdate}" required/>
                                              <input type="number" placeholder="Age" name="fage${key+1}" value="${member.age}" required/>
                                              <select name="frelation${key+1}" class="select-box" required>
                                                <option hidden>Member Relation</option>
                                                <option ${member.relation === 'GrandMother' ? 'selected':''} value="GrandMother">GrandMother</option>
                                                <option ${member.relation === 'GrandFather' ? 'selected':''} value="GrandFather">GrandFather</option>
                                                <option ${member.relation === 'Mother' ? 'selected':''} value="Mother">Mother</option>
                                                <option ${member.relation === 'Father' ? 'selected':''} value="Father">Father</option>
                                                <option ${member.relation === 'Husband' ? 'selected':''} value="Husband">Husband</option>
                                                <option ${member.relation === 'Wife' ? 'selected':''} value="Wife">Wife</option>
                                                <option ${member.relation === 'Son' ? 'selected':''} value="Son">Son</option>
                                                <option ${member.relation === 'Daughter' ? 'selected':''} value="Daughter">Daughter</option>
                                                <option ${member.relation === 'Uncle' ? 'selected':''} value="Uncle">Uncle</option>
                                                <option ${member.relation === 'Auntie' ? 'selected':''} value="Auntie">Auntie</option>
                                                <option ${member.relation === 'Nephew' ? 'selected':''} value="Nephew">Nephew</option>
                                                <option ${member.relation === 'Niece' ? 'selected':''} value="Niece">Niece</option>
                                                <option ${member.relation === 'Grandchild' ? 'selected':''} value="Grandchild">Grandchild</option>
                                                <option ${member.relation === 'Cousin' ? 'selected':''} value="Cousin">Cousin</option>
                                              </select>
                                        <div class="select-box">
                                                      <select name="fcivilstatus${key+1}" required>
                                                        <option hidden>Civil Status</option>
                                                        <option value="Single" ${member.civilStatus === 'Single' ? 'selected':''}>Single</option>
                                                        <option value="Married" ${member.civilStatus === 'Married' ? 'selected':''}>Married</option>
                                                        <option value="Widowed" ${member.civilStatus === 'Widowed' ? 'selected':''}>Widowed</option>
                                                      </select>
                                        </div>
                         </div>
        
                      <div class="column">
                            <input type="text" placeholder="Religion" name="freligion${key+1}" value="${member.religion}" required/>
                            <select name="feducation${key+1}" class="select-box" value="${member.educationAttainment}" required>
                              <option hidden>Educational Attainment</option>
                              <option value="Elementary" ${member.educationAttainment === 'Elementary' ? 'selected':''}>Elementary</option>
                              <option value="JuniorHigh" ${member.educationAttainment === 'JuniorHigh' ? 'selected':''}>JuniorHigh</option>
                              <option value="SeniorHigh" ${member.educationAttainment === 'SeniorHigh' ? 'selected':''}>SeniorHigh</option>
                              <option value="College" ${member.educationAttainment === 'College' ? 'selected':''}>College</option>
                            </select>
                            <input type="text" placeholder="Source of income/Work" value="${member.sourceOfIncome}" name="fincome${key+1}" required/>
                            <div class="select-box">
                              <select name="fgender${key+1}" value="${member.gender}">
                                <option hidden>Gender</option>
                                <option value="Female" ${member.gender === 'Female' ? 'selected':''}>Female</option>
                                <option value="Male" ${member.gender === 'Male' ? 'selected':''}>Male</option>
                                <option value="Prefer_not_to_say" ${member.gender === 'Prefer_not_to_say' ? 'selected':''}>Prefer not to say</option>
                              </select>
                            </div>
                      </div>
                      
                      <div class="column">
                              <input type="number" placeholder="Years of staying in the area" name="fyears${key+1}" value="${member.stayDuration}" required/>
                              <input type="text" placeholder="Philhealth(optional)" name="fphilid${key+1}" value="${member.philippineID}" />
                            <div class="select-box">
                              <select name="fmonthlyincome${key+1}" value="${member.incomeSource}">
                                <option hidden>Monthly income</option>
                                <option ${member.incomeSource === '5k-10k' ? 'selected':''} value="5k-10k">5k-10k</option>
                                <option ${member.incomeSource === '15k-25k' ? 'selected':''} value="15k-25k">15k-25k</option>
                                <option ${member.incomeSource === '30k+' ? 'selected':''} value="30k+">30k+</option>
                              </select>
                            </div>
                          <div class="checkbox">
                            <label><input type="checkbox" value="" ${member.additionalEmployment === 'Employed' ? 'checked':''} name="additionalEmployment"> Employed</label>
                          </div>
               </div> 
       
            `;
        $('.memContainer').append(famAddBlock);

        
    });

    const ePangkabuhayan = data.pangkabuhayan[data.pangkabuhayan.length-1];

    $('#lupa').val(ePangkabuhayan.LupangKinatatayuan);
    $('#bahayz').val(ePangkabuhayan.BahaynaTinitirhan);
    $('#upahan').val(ePangkabuhayan.LupangSakahanPinagyayaman);
    $('#basura').val(ePangkabuhayan.ParaanPagtataponngBasura);
    $('#luto').val(ePangkabuhayan.GamitnaEnerhiyasaPagluluto);
    $('#tubig').val(ePangkabuhayan.PinagkukunanngTubig);
    $('#dumi').val(ePangkabuhayan.UringPalikuran);
    $('#kuryente').val(ePangkabuhayan.PinagmumulanngElektrisidad);
    $('#sasakyan').val(ePangkabuhayan.sasakyan);
    $('#agrikultura').val(ePangkabuhayan.KasangkapangpangAgrukultura);
    $('#poultry').val(ePangkabuhayan.PangKomersiyo);
    
    JSON.parse(ePangkabuhayan.MgaKasangkapansaBahay).forEach((kasangkapan)=> {
        $(`[value="${kasangkapan}"]`).prop("checked",true);
    });

    const eNutrisyon = data.nutrisyon[data.nutrisyon.length-1];

    //console.log(JSON.parse(eNutrisyon.Family_members[0]));

    eNutrisyon.Family_members.forEach((nut,key)=> {
        let famAddBlock = `<div class="input-box member family-member">
            <label>Pangalan ${key+1}</label>
            <div class="column">
            <input type="text" placeholder="Member" name="nmember${key+1}" value="${nut.name}"/>
            <input type="date" placeholder="Kapanganakan" name="nkapanganakan${key+1}" value="${nut.birthdate}"/>
            </div>
            <div class="column">
              <input type="number" placeholder="Gulang sa buwan" name="ngulang${key+1}" value="${nut.age}"/>
              <input type="text" placeholder="Timbang " name="ntimbang${key+1}" value="${nut.timbang}" />
              <input type="text" placeholder="Imunisasyon" name="nimunisasyon${key+1}" value="${nut.imunisasyon}" />
              <input type="text" placeholder="Nasagawa"  name="nnasagawa${key+1}" value="${nut.nasagawa}"/>
            </div>
          </div>`;

        $('.form3Container').append(famAddBlock);
    });

    const ePWD = data.kalusuganPWD[data.kalusuganPWD.length-1];


    ePWD.Family_members.forEach((pwd,key)=> {
        let famAddBlock = `
            <div class="input-box member family-member">
                <label>Pangalan ${key+1}</label>
                <div class="column">
                
                <input type="text" placeholder="Member" name="pwdmember${key+1}" value="${pwd.name}"    />
                <input type="date" placeholder="Kapanganakan"  name="pwdkapanganakan${key+1}" value="${pwd.birthdate}"  />
                </div>
                <div class="column">
                    <input type="number" placeholder="Edad" name="pwdedad${key+1}" value="${pwd.age}"  />
                    <input type="text" placeholder="Kapansanan" name="pwdkapansanan${key+1}"  value="${pwd.disability}" />
                    <div class="select-box">
                    <select name="pwdkasarian${key+1}">
                        <option hidden>Kasarian</option>
                        <option ${pwd.gender === 'Babae' ? 'selected':''} value="Babae">Babae</option>
                        <option ${pwd.gender === 'Lalaki' ? 'selected':''} value="Lalaki">Lalaki</option>
                        <option ${pwd.gender === 'Iba pa' ? 'selected':''} value="Iba pa">Iba pa</option>
                    </select>
                </div> 
            </div>
            `;

        $('.form4Container').append(famAddBlock);
    });

    const eBuntis = data.kalusuganBuntis[data.kalusuganBuntis.length-1];

    $('#kasal').val(eBuntis.kasal);
    $('#livein').val(eBuntis.livein);
    $('.buntis #babae').val(eBuntis.babae);
    $('.buntis #lalake').val(eBuntis.lalake);
    $('.buntis #nakunan').val(eBuntis.nakunan);

    $('#balak').val(eBuntis.MayBalakpaMaganak);
    $('#nagpapagamot').val(eBuntis.Nagpapagamot);
    $('#kalagayan').val(eBuntis.Kalagayan);
    
    JSON.parse(eBuntis.FPmethod).forEach((fpp)=> {
        $(`input[type="checkbox"][value="${fpp}"]`).prop('checked',true);
    });


    const ePanlipunan = data.panlipunan[data.panlipunan.length-1];

    $(`#organisasyon1`).val(ePanlipunan.organisasyon1);
    $(`#katungkulan1`).val(ePanlipunan.katungkulan1);
    $(`#pambarangay`).val(ePanlipunan.pambarangay);
    $(`#pambayan`).val(ePanlipunan.pambayan);
    
    
    $(`[name="tbl1"]`).val(eMiyembro.id);
    $(`[name="tbl2"]`).val(ePangkabuhayan.id);
    $(`[name="tbl3"]`).val(eNutrisyon.id);
    $(`[name="tbl4"]`).val(ePWD.id);
    $(`[name="tbl5"]`).val(eBuntis.id);
    $(`[name="tbl6"]`).val(ePanlipunan.id);
    
    
    localStorage.setItem('recordNum', JSON.stringify({
        miyembro: eMiyembro.Family_members.length,
        nutrisyon: eNutrisyon.Family_members.length,
        pwd: ePWD.Family_members.length
    }));

    //$('.memContainer').

    // If there's an error, log it
    if (error) {
      console.error('Error connection! Please try again.', error.message);
    } else {
      // If successful, show an alert
      console.log('Connection secured!');
      $('.submit').removeAttr('disabled');
    }
  } catch (error) {
    console.error('Error:', error.message);
  }


  function nullChecker(elem, value) {
    if (value !== null ) {
      $(elem).val(value);  
    }
    
  }
}
// Call the checkConnection function
checkConnection();




async function nextPage2() {

  const recordNum = JSON.parse(localStorage.getItem('recordNum'));

  let miyembro = {
    pinuno: $('#fullname').val(),
    nakatira: $('#completeAdd').val(),
    Sitio: $('#sitio').val(),
    Purok: $('#purok').val(),
    sinoka: $('#relations').val(),
    bahayNumero: $('#houseNum').val(),
    kasarian: $('[name="gender"]:checked').val(),
    Family_members:new Array,
    Employed: $('[name="isEmployee"]:checked').length ? "employed" : "unemployed"
  };
    

  for($i = 1; $i <= recordNum.miyembro; $i++) {
    miyembro[`Family_members`].push({
      name: $(`[name="fmember${$i}"]`).val(),
      birthdate: $(`[name="fbday${$i}"]`).val(),
      age: $(`[name="fage${$i}"]`).val(),
      civilStatus: $(`[name="fcivilstatus${$i}"]`).val(),
      relation: $(`[name="frelation${$i}"]`).val(),
      educationAttainment: $(`[name="feducation${$i}"]`).val(),
      sourceOfIncome: $(`[name="fincome${$i}"]`).val(),
      gender: $(`[name="fgender${$i}"]`).val(),
      stayDuration: $(`[name="fyears${$i}"]`).val(),
      incomeSource: $(`[name="fmonthlyincome${$i}"]`).val(),
      philippineID: $(`[name="fphilid${$i}"]`).val(),
      religion: $(`[name="freligion${$i}"]`).val(),
    });
  }


  const khaus = new Array;
    $('.khaus:checked').each(function(test, item) {
        khaus.push(item.value);
    });

    let pangkabuhayan =
    {
      LupangKinatatayuan: $('#lupa').val(),
      BahaynaTinitirhan: $('#bahayz').val(),
      LupangSakahanPinagyayaman: $('#upahan').val(),
      ParaanPagtataponngBasura: $('#basura').val(),
      GamitnaEnerhiyasaPagluluto: $('#luto').val(),
      PinagkukunanngTubig: $('#tubig').val(),
      UringPalikuran: $('#dumi').val(),
      PinagmumulanngElektrisidad: $('#kuryente').val(),
      sasakyan: $('#sasakyan').val(),
      KasangkapangpangAgrukultura: $('#agrikultura').val(),
      PangKomersiyo: $('#poultry').val(),
      MgaKasangkapansaBahay: JSON.stringify(khaus)
    }

   

   let nutrisyon = {'Family_members':new Array};

    for($i = 1; $i <= recordNum.nutrisyon; $i++) {
      nutrisyon[`Family_members`].push({
        name: $(document).find(`[name="nmember${$i}"]`).val(),
        birthdate: $(`[name="nkapanganakan${$i}"]`).val(),
        age: $(`[name="ngulang${$i}"]`).val(),
        timbang: $(`[name="ntimbang${$i}"]`).val(),
        imunisasyon: $(`[name="nimunisasyon${$i}"]`).val(),
        nasagawa: $(`[name="nnasagawa${$i}"]`).val()
      })
    }


    let kalusuganPWD = {"Family_members":new Array,"Family_mem_2":new Array,"Family_mem_3":new Array};

    for($i = 1; $i <= recordNum.pwd; $i++) {
      kalusuganPWD[`Family_members`].push({
        name: $(`[name="pwdmember${$i}"]`).val(),
        birthdate: $(`[name="pwdkapanganakan${$i}"]`).val(),
        age:$(`[name="pwdedad${$i}"]`).val(),
        disability:$(`[name="pwdkapansanan${$i}"]`).val(),
        gender:$(`[name="pwdkasarian${$i}"]`).val()
      });
    }

    const fpp = new Array;
    $('.fpp:checked').each(function(test, item) {
        fpp.push(item.value);
    });

    let kalusuganBuntis = {
      kasal:$(`#kasal`).val(),
      livein:$(`#livein`).val(),
      babae:$(`.buntis #babae`).val(),
      lalake:$(`.buntis #lalake`).val(),
      nakunan:$(`.buntis #nakunan`).val(),
      MayBalakpaMaganak:$(`#balak`).val(),
      Nagpapagamot:$(`#nagpapagamot`).val(),
      Kalagayan:$(`#kalagayan`).val(),
      FPmethod:JSON.stringify(fpp)
    }

    
    
    let panlipunan = {
      organisasyon1: $(`#organisasyon1`).val(),
      katungkulan1: $(`#katungkulan1`).val(),
      pambarangay: $(`#pambarangay`).val(),
      pambayan: $(`#pambayan`).val()
    }


    var fields = [
      [miyembro,"miyembro",parseInt($("[name='tbl1'").val())],
      [pangkabuhayan,"pangkabuhayan",parseInt($("[name='tbl2'").val())],
      [nutrisyon,"nutrisyon",parseInt($("[name='tbl3'").val())],
      [kalusuganPWD,"kalusuganPWD",parseInt($("[name='tbl4'").val())],
      [kalusuganBuntis,"kalusuganBuntis",parseInt($("[name='tbl5'").val())],
      [panlipunan,"panlipunan",parseInt($("[name='tbl6'").val())]
    ];

  fields.forEach(async function(field) {
    const { data, error } = await database
      .from(field[1])
      .update([field[0]])
      .eq('id', field[2]);
  });

  
  

  

  alert('User Updated!');
  setTimeout(function() {
    window.location.href = 'index.html';
  }, 3000);
  // return false;

  return false;
}