var CoverPage = false;
var Logo = true;

function ShowConfiguration(){
	var t = "<table>";
	if (CoverPage)
		t = t + "<tr><td style='width:100%;text-align:center'><img src='./Img/CoverPage.jpg' width='100%'></td></tr>";
	else {
		if (Logo)
			t = t + "<tr><td style='width:100%;text-align:center'><img src='./Img/Logo.jpg' width='120' height='120'></td></tr>";
		t = t + "<tr><td style='width:100%;text-align:center'><p style='font-size:20px;font-weight:bold'>" + Configuration.Name + "</p></td></tr>";
		t = t + "<tr><td style='width:100%;text-align:center'><p style='font-size:20px;font-weight:bold'>" + Configuration.Description + "</p></td></tr>";
		t = t + "<tr><td style='width:100%;text-align:center'><p style='font-size:20px;font-weight:bold'>" + Configuration.Address + "</p></td></tr>";
		t = t + "<tr><td style='width:100%;text-align:center'><p style='font-size:20px;font-weight:bold'>" + Configuration.Phone + "</p></td></tr>";
	}
		
	t = t + "<tr><td style='width:100%;text-align:center'><a href='" + Configuration.Whatsapp + "' target='_blank'><img src='./Img/Whatsapp.png' width=40 height=40></a>&nbsp;&nbsp;&nbsp;<a href='" + Configuration.Facebook + "' target='_blank'><img src='./Img/Facebook.png' width=40 height=40></a>&nbsp;&nbsp;&nbsp;<a href='" + Configuration.Instagram + "' target='_blank'><img src='./Img/Instagram.png' width=40 height=40></a>&nbsp;&nbsp;&nbsp;<a href='" + Configuration.Tiktok + "' target='_blank'><img src='./Img/Tiktok.png' width=40 height=40></a>&nbsp;&nbsp;&nbsp;<a href='" + Configuration.GoogleMaps + "' target='_blank'><img src='./Img/GoogleMaps.png' width=40 height=40></a></td></tr>";
	t = t + "</table>";
	document.getElementById('Configuration').innerHTML=t;
};

function ShowAllPOS() {
	ShowConfiguration();
	var CategoriesAndItemsLength = CategoriesAndItems.length;
	var t = "<table>";
	for (var CategoryID = 0; CategoryID < CategoriesAndItemsLength; CategoryID++){
		var Items = CategoriesAndItems[CategoryID].Items;
		var ItemsLength = Items.length;
		t = t + "<tr><td colspan=4><p style='font-size:20px;font-weight:bold;color:Red;margin-top:30px;margin-bottom:10px;'>" + CategoriesAndItems[CategoryID].Category + "</p></td></tr>";
		for (var i = 0; i < ItemsLength; i++){
			t = t + "<tr><td style='width:100%;font-size:16px;font-weight:bold;'>" + Items[i].Item + "</td><td style='font-size:16px;font-weight:bold;text-align:right;'>" + Items[i].Price + "</td><td style='font-size:16px;font-weight:bold;padding-left:10px;'>" + Items[i].Currency + "</td><td hidden style='width:1%;font-size:12px;color:Blue;'>" + Items[i].Barcode + "</td></tr>";
			if (Items[i].Description != "Description")
				t = t + "<tr><td style='font-size:14px;color:gray;'>" + Items[i].Description + "</td><td>&nbsp</td></tr>";
		}
	}
	t = t + "</table>";
	document.getElementById('tblCategoriesAndItems').innerHTML=t;
};

function ShowFilteredDescription(e,Search_Value) {
	var CategoriesAndItemsLength = CategoriesAndItems.length;
	var t = "<table>";
	for (var CategoryID = 0; CategoryID < CategoriesAndItemsLength; CategoryID++){
		var Items = CategoriesAndItems[CategoryID].Items;
		var ItemsLength = Items.length;
		if (CategoriesAndItems[CategoryID].Category.toUpperCase().includes(Search_Value.toUpperCase())){
			t = t + "<tr><td colspan=4><p style='font-size:20px;font-weight:bold;color:Red;margin-top:30px;margin-bottom:10px;'>" + CategoriesAndItems[CategoryID].Category + "</p></td></tr>";
			for (var i = 0; i < ItemsLength; i++){
				t = t + "<tr><td style='width:100%;font-size:16px;font-weight:bold;'>" + Items[i].Item + "</td><td style='font-size:16px;font-weight:bold;text-align:right;'>" + Items[i].Price + "</td><td style='font-size:16px;font-weight:bold;padding-left:10px;'>" + Items[i].Currency + "</td><td hidden style='width:1%;font-size:12px;color:Blue;'>" + Items[i].Barcode + "</td></tr>";
				if (Items[i].Description != "Description")
					t = t + "<tr><td style='font-size:14px;color:gray;'>" + Items[i].Description + "</td><td>&nbsp</td></tr>";
			}
		}
		else{
			var found_Search_Value = false;
			for (var i = 0; i < ItemsLength; i++)
				if (Items[i].Barcode.toUpperCase().includes(Search_Value.toUpperCase()) || Items[i].Item.toUpperCase().includes(Search_Value.toUpperCase())){
					found_Search_Value = true;
					break;
				}
			if (found_Search_Value){
				t = t + "<tr><td colspan=4><p style='font-size:20px;font-weight:bold;color:Red;margin-top:30px;margin-bottom:10px;'>" + CategoriesAndItems[CategoryID].Category + "</p></td></tr>";
				for (var i = 0; i < ItemsLength; i++)
					if (Items[i].Barcode.toUpperCase().includes(Search_Value.toUpperCase()) || Items[i].Item.toUpperCase().includes(Search_Value.toUpperCase())){
						t = t + "<tr><td style='width:100%;font-size:16px;font-weight:bold;'>" + Items[i].Item + "</td><td style='font-size:16px;font-weight:bold;text-align:right;'>" + Items[i].Price + "</td><td style='font-size:16px;font-weight:bold;padding-left:10px;'>" + Items[i].Currency + "</td><td hidden style='width:1%;font-size:12px;color:Blue;'>" + Items[i].Barcode + "</td></tr>";
						if (Items[i].Description != "Description")
							t = t + "<tr><td style='font-size:14px;color:gray;'>" + Items[i].Description + "</td><td>&nbsp</td></tr>";
					}
			}
		}
	}
	t = t + "</table>";
	document.getElementById('tblCategoriesAndItems').innerHTML=t;
	if (e.keyCode == 13){
		document.getElementById('txtSearchDescription').value="";
		document.getElementById('txtSearchBarcode').value="";
	}
};

function ShowFilteredBarcode(e,Search_Value) {
	if (e.keyCode !=13)
		return;
	var CategoriesAndItemsLength = CategoriesAndItems.length;
	var t = "<table>";
	for (var CategoryID = 0; CategoryID < CategoriesAndItemsLength; CategoryID++){
		var Items = CategoriesAndItems[CategoryID].Items;
		var ItemsLength = Items.length;
		var found_Search_Value = false;
		for (var i = 0; i < ItemsLength; i++)
			if (Items[i].Barcode.toUpperCase().includes(Search_Value.toUpperCase())){
				found_Search_Value = true;
				break;
			}
			if (found_Search_Value){
				t = t + "<tr><td colspan=4><p style='font-size:20px;font-weight:bold;color:Red;margin-top:30px;margin-bottom:10px;'>" + CategoriesAndItems[CategoryID].Category + "</p></td></tr>";
				for (var i = 0; i < ItemsLength; i++)
					if (Items[i].Barcode.toUpperCase().includes(Search_Value.toUpperCase())){
						t = t + "<tr><td style='width:100%;font-size:16px;font-weight:bold;'>" + Items[i].Item + "</td><td style='font-size:16px;font-weight:bold;text-align:right;'>" + Items[i].Price + "</td><td style='font-size:16px;font-weight:bold;padding-left:10px;'>" + Items[i].Currency + "</td><td hidden style='width:1%;font-size:12px;color:Blue;'>" + Items[i].Barcode + "</td></tr>";
						if (Items[i].Description != "Description")
							t = t + "<tr><td style='font-size:14px;color:gray;'>" + Items[i].Description + "</td><td>&nbsp</td></tr>";
					}
			}
	}
	t = t + "</table>";
	document.getElementById('tblCategoriesAndItems').innerHTML=t;
	document.getElementById('txtSearchDescription').value="";
	document.getElementById('txtSearchBarcode').value="";
};

function ShowAllRestaurant() {
	ShowConfiguration();
	var CategoriesAndItemsLength = CategoriesAndItems.length;
	var t = "";
	for (var i = 0; i < CategoriesAndItemsLength; i=i+2)
		if (i+1 < CategoriesAndItemsLength){
			t = t + "<tr><td style='width:45%;text-align:center;'><img id=" + i + " src='" + CategoriesAndItems[i].CategoryOnlinePicture + "' width=100% onclick='ShowItems(this.id)'></td><td style='width:10%;'>&nbsp;</td><td style='width:45%;text-align:center;'><img id=" + (i+1) + " src='" + CategoriesAndItems[i+1].CategoryOnlinePicture + "' width=100% onclick='ShowItems(this.id)'></td></tr>";
			t = t + "<tr><td style='width:45%;text-align:center;'><p id=" + i + " style='font-size:20px;font-weight:bold;' onclick='ShowItems(this.id)'>" + CategoriesAndItems[i].Category + "</p></td><td style='width:10%;'>&nbsp;</td><td style='width:45%;text-align:center;'><p id=" + (i+1) + " style='font-size:20px;font-weight:bold;' onclick='ShowItems(this.id)'>" + CategoriesAndItems[i+1].Category + "</p></td></tr>";
			t = t + "<tr><td>&nbsp</td></tr>";
		}
		else{
			t = t + "<tr><td style='width:45%;text-align:center;'><img id=" + i + " src='" + CategoriesAndItems[i].CategoryOnlinePicture + "' width=100% onclick='ShowItems(this.id)'></td></tr>";
			t = t + "<tr><td style='width:45%;text-align:center;'><p id=" + i + " style='font-size:20px;font-weight:bold;' onclick='ShowItems(this.id)'>" + CategoriesAndItems[i].Category + "</p></td></tr>";
			t = t + "<tr><td>&nbsp</td></tr>";
		}
	document.getElementById('tblCategories').innerHTML = t;
	document.getElementById('tblCategories').style.display = "table";
	document.getElementById('tblItems').innerHTML = "<table style='width:100%;margin-bottom:40px;'><tr><td style='width:100%;text-align:left;'><p style='font-size:24px;font-weight:bold;color:Red;'>Category</p></td><td style='width:100%;text-align:right;'><img src='./Img/Back.png' width=40 height=40 onclick='BackButton()'></td></tr></table>";
	document.getElementById('tblItems').style.display = "None";
};

function ShowItems(CategoryID) {
	var Items = CategoriesAndItems[CategoryID].Items;
	var ItemsLength = Items.length;
	var t = "<table style='width:100%;margin-bottom:40px;'><tr><td style='width:100%;text-align:left;'><p style='font-size:24px;font-weight:bold;color:Red;'>" + CategoriesAndItems[CategoryID].Category + "</p></td><td style='width:100%;text-align:right;'><img src='./Img/Back.png' width=40 height=40 onclick='BackButton()'></td></tr></table>";
	for (var i = 0; i < ItemsLength; i++)
		t = t + "<table style='width:100%;margin-bottom:40px;'><tr><td style='width:40%;text-align:center;border:solid;'><img src='" + Items[i].ItemOnlinePicture + "' width=100%></td><td style='width:60%;text-align:center;border:solid;padding:10px 10px 10px 10px;'>" + (Items[i].Recommended == "False"?"":"<p><span style='font-size:20px;color:Red;'>&#9733&#9733&#9733 Popular &#9733&#9733&#9733</span></p>") + "<p style='font-size:14px;color:Blue;'>" + Items[i].Barcode + "</p><p style='font-size:18px;font-weight:bold;'>" + Items[i].Item + "</p><p><span style='color:gray;font-size:16px;'>" + Items[i].Description + "</span></p><p><span style='color:green;font-size:18px;font-weight:bold;'>" + Items[i].Price + "</span><span style='color:green;font-size:18px;font-weight:bold;padding-left:5px'>" + Items[i].Currency + "</span></p></td></tr></table>";
	t = t + "<table style='width:100%;margin-bottom:20px;'><tr><td style='width:40%;text-align:center;border:none;'><img src='./Img/Back.png' width=80 height=80 onclick='BackButton()'></td></tr></table>";	
	document.getElementById('tblCategories').style.display = "None";
	document.getElementById('tblItems').innerHTML = t;
	document.getElementById('tblItems').style.display = "table";
	scroll(0,0);
}

function BackButton(){
	document.getElementById('tblCategories').style.display = "table";
	document.getElementById('tblItems').style.display = "None";
	scroll(0,0);
}

