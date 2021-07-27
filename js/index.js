$(document).ready(function () {
    //     console.log(ses sionStorage.getItem('data'))
    var data_books=''

    



    $.ajax({
        url:"main.php",
        type:"post",
        async:false,
        data:{
            "get_books":1
        },
        success:function(all_data){
//                                console.log(all_data)
            data_books=JSON.parse(all_data)

        }

    })

//$('.loader').show()
    function Main(){
        this.data = JSON.parse(sessionStorage.getItem('data'))
        this.data_books=data_books;
        this.end=0;
        this.value_free=11
        this.value_paid=11
        this.total_sales=0
        this.total_withdrawal=0
        this.amount_gen=0;
        this.pdf_name=""
        this.dt =  new Date()
        this.time = this.dt.getHours() + ":" + this.dt.getMinutes() + ":" + this.dt.getSeconds();
        this.day = this.dt.getUTCDate();
        this.month = String(this.dt.getMonth() + 1).padStart(2, '0');
        this.year = this.dt.getFullYear();
        this.date = this.year+"-"+this.month+"-"+this.day;

        this.graph=function(container,type,legend,height_){

            var ctx = document.getElementById(container);
            ctx.height=50;
            var myChart = new Chart(ctx, {
                type: type,
                data: {
                    labels: ['1', '5', '10', '15', '20', '25', '30'],
                    datasets: [{
                        label: '# of Votes',
                        data: [12, 19, 3, 5, 2, 30, 8],
                        backgroundColor: [

                            'rgba(255, 212,0, 0.6)',
                            'rgba(255, 99, 132, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255,1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1,
                        height:100
                    }]
                },
                options: {
                    legend: {
                        display: legend,
                        position:'right'

                    }
                }
            });
        }
        this.search= function(viewer,searcher){
            $('#result').show();

            $('.'+viewer).html('');
            var searchField = $('.'+searcher).val();
            if(searchField==""){
                $('.'+viewer).hide();
            }else{
                $('.'+viewer).show();
            }
            var searchField1 = $('.'+searcher).val().trim().toLowerCase();
            var expression = new RegExp(searchField,"i");
            //        console.log(searchField)
            //        $.getJSON(nn, function (data) {
            $.each(this.data_books, function (key,value){
//                console.log(value[1])
             
                if(value[1].search(expression) != -1 ||value[3].search(expression) != -1|| value[8].search(expression) != -1 ){
                   
                    $('.'+viewer).append('<li syle="width:100%"><div class="row pr-1 "><div><p class=" small search_val" target_data="'+value[1]+'">'+value[1]+' ('+value[8]+')</p></div></div></li>');

                }
                else{
                    //                    $('.'+viewer).hide();
                    $('.'+viewer).show('<li syle="width:100%"><div class="row pr-3 pl-1"><div><p class="mt-1">No Results Found</p></div><hr></div></li>');
                }

                $('.search_val').click(function(e){
                    //         $(e.target).html()
                    console.log($(e.target).attr('target_data'))
                    $('.search_btn').attr('target_data',$(e.target).attr('target_data'))
                    $('.searcher').val($(e.target).html())
                    $('.'+viewer).hide();         
                })

            });
            //        });
        }
        
        
        this.write=function(fname,oname,sname,contact,country,residence,image){
            $('.name_here').html(fname+' '+oname+' '+sname) 
            $('#fname_').val(fname) 
            $('#oname_').val(oname) 
            $('#sname_').val(sname) 
            $('#contact_').val(contact) 
            $('#country_').val(country) 
            $('#residence_').val(residence) 
            $('#person_img, #person_img_').css( {'background-image': 'url(img_load/person/'+image+')'} ) 
            $('.set_img').attr('src','img_load/person/'+image) 

        }
        this.acc=function(){
//            console.log()
            this.acc=JSON.parse(this.data.account)
            $('.mode_').html(this.acc[0].account_details.mode)
            $('.mobile_number').html(this.acc[0].account_details.number)
            $('.mobile_name').html(this.acc[0].account_details.name)
        }
        this.home_free=function(start,end,data){
//        $('.loader').show()
            for(var i = start ; i>=end ; i--){
                console.log((data[i][2]))
                if((data[i][2])=='free'  && (data[i][12])=='Published'){
                    $('.free_write').html('Free Books ')  
                    $('.home_load_free').append('<div class="col-lg-4 mt-3"><div class="row no-gutters main_ rounded shadow-sm mb-2 ml-1 "> <div class="col-4 show_" data_id="'+data[i][15]+'"> <img src="img_load/'+data[i][0]+'" class="rounded show_" data_id="'+data[i][15]+'" width="100%" alt=""> </div><div class="col-8 pt-1 pl-2 pr-2 pb-1"><div class="row no-gutters" data_id="'+data[i][15]+'"> <div  class="col-10"> <b class="show_ section_" data_id="'+data[i][15]+'" >'+data[i][1]+'</b></div> <div data_id="'+data[i][15]+'" data_id_="'+data[i][15]+'" class="icon icon-heart-o float-right pl-1 col-2 heart logger" style="font-size:30px"  data-toggle="modal" data-target="#login_"></div></div><span class="pb-2 show_ small" data_id="'+data[i][15]+'">'+(data[i][7]).substring(100,0)+'...</span><br><div class="row no-gutters mt-2"><div class="col-4  btn gold reader data_id="'+data[i][15]+'"> <b pdf_name="'+data[i][16]+'" data_id="'+data[i][15]+'" class="" >Read</b> </div><a href="books/'+data[i][16]+' "href_="books/'+data[i][16]+'" data_id="'+i+'" class="btn btn-dark ml-3 small downloaded" style="color:white" download data_id="'+data[i][15]+'" >Download</a> <div class="col-6"><span class="fas fa-heart">  </span></div></div></div> <div class="ml-2 '+i+'show  hiding"> <span class="small mb-2"> Downloading </span> <span class="small pb-2 '+i+'percentage"></span>  </div> </div></div>')

                }
            $('.loader').hide()
             
            }
            
 
 
        }
        
        this.home=function(start,end,data){
            $('.loader').show()
            var free_check=0
            for(var i = start ; i>=end ; i--){
                if((data[i][2])!='free' && (data[i][12])=='Published'){
                    free_check++
                    $('.home_load').append('<div class="col-lg-4 mt-3 "><div class="row no-gutters main_ rounded shadow-sm mb-2 ml-1"> <div class="col-4 show_" data_id="'+data[i][15]+'"> <img src="img_load/'+data[i][0]+'" class="rounded show_" data_id="'+data[i][15]+'" width="100%" alt=""> </div><div class="col-8 pt-1 pl-2 pr-2 pb-1"><p class="show_" data_id="'+data[i][15]+'"><b data_id="'+data[i][15]+'" class="section_ small">'+data[i][1]+'</b></p><span class="pb-2 show_ small" data_id="'+data[i][15]+'">'+(data[i][7]).substring(100,0)+'...</span> <br><div class="row no-gutters mt-2"><div class="col-6 mt-1 show_" data_id="'+data[i][15]+'"> <b data_id="'+data[i][15]+'">GHC '+data[i][2]+'</b></div><div class="col-6"> <div class="btn btn-dark cartter logger small ml-1" data-toggle="modal"  data-target="#login_" data_id="'+data[i][15]+'" > Add to cart</div></div></div></div></div></div>')


                }
                
            }
             $('.loader, .loader_publish, .loader_book, .loader_update, .loader_update__').hide()
            if(free_check==0){
              $('.no_free').hide()  
            }else{
                $('.no_free').show() 
            }
        }
        
        this.back_free=function(start,end,data){
//            $('.loader').show()
            for(var i = start ; i>=end ; i--){
                if((data[i][2])=='free'){
                    var time = (data[i][13]).split('.')
                    $('.free_books_here').append('<tr><td scope="col">'+i+'</td><td scope="col">'+data[i][1]+'</td><td scope="col">'+data[i][14]+'</td><td scope="col">'+time[0]+'</td><td scope="col">Free</td><td scope="col">'+data[i][12]+'</td><td scope="col"><button class="btn btn-dark">Read</button></td><td scope="col"><button class="btn btn-dark detailer" data-toggle="modal" data-target="#details" data_id="'+data[i][15]+'" data_index="'+i+'">Details</button </td></tr>')


                }
                
            }
             $('.loader').hide()
             
             
            
        }
        this.back_paid=function(start,end,data){
//            $('.loader').show()
            for(var i = start ; i>=end ; i--){
                if((data[i][2])!='free' ){
                    var time = (data[i][13]).split('.')
                    $('.paid_books_here').append('<tr><td scope="col">'+i+'</td><td scope="col">'+data[i][1]+'</td><td scope="col">'+data[i][14]+'</td><td scope="col">'+time[0]+'</td><td scope="col">Free</td><td scope="col">'+data[i][12]+'</td><td scope="col"><button class="btn btn-dark">Read</button></td><td scope="col"><button class="btn btn-dark detailer" data-toggle="modal" data-target="#details" data_id="'+data[i][15]+'" data_index="'+i+'">Details</button </td></tr>')


                }
                
            }
             $('.loader').hide()
            
        }
        
        this.cart_writer=function(main,value){
//             $('.loader').show()
            var sum=0
            var quantity=0
            if(value.length>0){ 
                $('.put_cart').html("")
                for(var x in value){
                    if(value[x]!=null){
                        for(var k in main.data_books){
                            if(value[x].item_id==main.data_books[k][15]){

                                $('.put_cart').append('<div class="col-lg-4 mt-3"> <div class="row no-gutters main_ rounded shadow-sm mb-2 ">  <div class="col-4"><img src="img_load/'+main.data_books[k][0]+'" class="rounded" width="100%" alt=""></div><div class="col-8 pl-1 pt-1 pb-1"><h5 class="pl-1"><b class="section_ small">'+main.data_books[k][1]+'</b></h5><span class="small"><b>Author</b></span><span class="col-6 small"><b class="section_ small">'+main.data_books[k][8]+'</b> </span><br><span class=" small"> <b>Price</b> </span><span class=" small col-10"><b>GHC '+main.data_books[k][2]+'</b> </span><br> <span class="small"> <b>Date</b> </span><span class="col-4 text-muted small"> <b>'+main.data_books[k][14]+'</b> </span><br><div class="row no-gutters mt-2 small"><div class="col-6"> <div class="btn btn-dark buyer logger" data_id="'+main.data_books[k][15]+'" data-toggle="modal"  data-target="#login_" >Buy Now</div></div><div class="col-6"> <div class="btn btn-warning remover" data_id='+main.data_books[k][15]+'>Remove</div></div></div></div></div></div>')
                                quantity+=1
                                if(main.data_books[k][2]!='free'){
                                    sum=sum+ parseInt(main.data_books[k][2])
                                }

                            }
                        }
                        $('.value_total').html("GHC "+sum)
                        $('.cart_total').html(quantity)
                    }

                }
                 $('.loader').hide()
            }else{
                $('.put_cart').html("")

                $('.cart_total').html(0)
                $('.value_total').html("GHC "+0)
            }
            $('.remover').click(function(e){

                var id = $(e.target).attr('data_id')
                var new_=[]
                var data=JSON.parse(main.data.cart)
                for(var x in data){
                    if(data[x]!='empty' || data[x]!=undefined || data[x]!=null ){
                        console.log(data[x].item_id)
                        console.log(id)
                        if(data[x].item_id==id){
                            delete data[x]

                        }
                    }

                    if(data[x]!='empty' && data[x]!=undefined && data[x]!=null ){
                        console.log(data[x])
                        new_.push(data[x])
                        console.log(new_)
                    }


                }
                console.log(new_)
                main.data.cart=JSON.stringify(new_)
                sessionStorage.setItem('data',main.data)


                $.ajax({
                    url:"main.php",
                    type:"post",
                    async:true,
                    data:{
                        "add_cart":1,
                        "id":main.data.id,
                        "data":main.data.cart
                    },
                    success:function(all_data_){
                        console.log(all_data_)


                    }

                })



                if(new_.length>0){
                    $('.badge').show()
                    $('.empty_cart').hide()
                    $('.badge').html(new_.length)
                }else{
                    $('.put_cart').html("")
                    $('.badge').hide()
                    $('.empty_cart').show()
                }

                main.cart_writer(main,new_)




            })

        }
        this.show=function(main){
            $('.show_').click(function (e) {
                $('.navbar').hide()
                $('.hiders').hide()
                $('.back').show()
                $('.view').slideDown(150)

                for(var x in main.data_books){
                    if($(e.target).attr('data_id')==main.data_books[x][15]){
                        $('.title_').html(main.data_books[x][1])
                        $('.img_').attr('src','img_load/'+main.data_books[x][0])
                        $('.show_catter').attr('data_id',main.data_books[x][15])
                        $('.author_').html(main.data_books[x][8])
                        $('.cate_').html(main.data_books[x][4])
                        $('.describe_').html(main.data_books[x][7])
                        $('.year_').html(main.data_books[x][5])
                        $('.language_').html(main.data_books[x][6])
                        $('.price_').html('GHC '+main.data_books[x][2])
                        $('.buy_now, .add_cart').attr('data_id',main.data_books[x][15])
                        if(main.data_books[x][2]=='free'){
                            $('.free').show()
                            $('.pay').hide()
                            $('.downloader').attr('href','books/'+main.data_books[x][16])
                            $('.reader').attr('pdf_name',main.data_books[x][16])
                        }else{
                            $('.free').hide()
                            $('.pay').show()
                            
                            
                        }

                    }
                }


            })

        }
        this.reader=function(number,url,name){
            
            let pdfDoc=null,
                pageNum=number,
                pageIsRedering=false,
                pageNumIsPending=null;

            const scale=1,
                  canvas=document.querySelector('#read_here'),
                  ctx=canvas.getContext('2d');

            const renderpage =num=>{ 
                pageIsRedering=true;

                pdfDoc.getPage(num).then(page=>{
                    const viewport = page.getViewport({scale});
                    canvas.height=viewport.height;
                    canvas.width=viewport.width;

                    const renderCtx={
                        canvasContext:ctx,
                        viewport

                    }

                    page.render(renderCtx).promise.then(()=>{
                        pageIsRedering=false;

                        if(pageNumIsPending!=null){
                            renderpage(pageNumIsPending);
                            pageNumIsPending=null;
                        }
                    });

                    document.querySelector('.page').textContent=num;



//$('.loader_read').hide()



                })
            }



            pdfjsLib.getDocument(url).promise.then(pdfDoc_ =>{
                pdfDoc=pdfDoc_;
                $('.pages').html(pdfDoc.numPages+' Pages')
                $('.book_title').html(name)

                renderpage(pageNum)

            })     
            
//             $('.loader_read').hide()

        }
        this.my_books=function(data1,data,main){
            $('.load_my_books').html('')
             if(data1.length==0){
                $('.book_error').show()
            }else{
                 $('.book_error').hide()
            }
            for(var i in data){
                for(var k=0;k<data1.length;k++){
//                    console.log(data)
//                    console.log(data1)
                    if(data[i][15]==data1[k]){
                        $('.load_my_books').append('<div class="col-lg-4"><div class="row no-gutters main_ rounded shadow-sm mb-2 "> <div class="col-4 show_" data_id="'+data[i][15]+'"> <img src="img_load/'+data[i][0]+'" class="rounded show_" data_id="'+data[i][15]+'" width="100%" alt=""> </div><div class="col-8 pt-1 pl-2 pr-2 pb-1"><div class="row no-gutters" data_id="'+data[i][15]+'"> <div  class="col-10"> <b class="show_" data_id="'+data[i][15]+'" class="section_ small">'+data[i][1]+'</b></div> <div data_id="'+data[i][15]+'" data_id_="'+data[i][15]+'" class="icon icon-heart float-right pl-1 col-2 logger" style="font-size:30px"  data-toggle="modal" data-target="#login_"></div></div><span class="pb-2 show_ small" data_id="'+data[i][15]+'">'+data[i][7]+'</span><br><div class="row no-gutters mt-2"><div class="col-4  btn gold reader" pdf_name="'+data[i][16]+'" data_id="'+data[i][15]+'"> <b pdf_name="'+data[i][16]+'" data_id="'+data[i][15]+'" class="" >Read</b> </div><a href="books/'+data[i][16]+'" class="btn btn-dark  small ml-3 downloaded" download data_id="'+data[i][15]+'" >Download</a><div class="col-5"><span class="fas fa-heart">  </span></div></div></div></div></div>')
                    }
                }
            }
            var book='';
            var number='';
            $('.reader').click(function(e){
                $('.home').hide()
                $('#view_').hide()
                $('.navbar').hide()
                $('.books').hide()
                $('.reader_').show()
                main.pdf_name=$(e.target).attr('pdf_name')
                console.log($(e.target).attr('pdf_name'))
                var url = 'books/'+$(e.target).attr('pdf_name');
                book=url
                main.reader(1,url,main.pdf_name)
                number=1

$('#view_').hide()
            })
            
           


        }
        this.history=function(data,sales,main_){
            $('.transaction_history').html('')
            
            for(var i in data){
                var val=parseInt(i)+1
                 console.log(main_.total_withdrawal)
                console.log(data[i].amount)
                var go = parseFloat(data[i].amount)
                main_.total_withdrawal = go + main_.total_withdrawal
               
//                }
            $('.transaction_history').append('<tr><th scope="row">'+val+'</th><td>'+data[i].date+'</td><td>'+data[i].time+'</td><td>'+data[i].id+'</td><td>'+data[i].amount+'</td><td>'+data[i].status+'</td></tr>')
           }
            $('.total_withdrawal').html('GHC '+main_.total_withdrawal)
           
            $('.avail_bal').html('GHC '+ parseInt(sales - main_.total_withdrawal))
            
             JSON.parse(main.data.account)[0].total_withdrawal=main_.total_withdrawal
        }
        this.condition=function(main){
            
            $('.downloaded').click(function(e){
                  var id=$(e.target).attr("data_id")
                  var link=$(e.target).attr("href_")
                  console.log(id)
                  console.log(link)
                  
                  var ajax = new XMLHttpRequest();
                ajax.responseType="blob";
     ajax.open("GET", link+"", true);
     ajax.send()
    
      ajax.onprogress=function(e){
          
                 var value = parseInt((e.loaded / e.total) *100 )
                 
                 $("."+id+"show").show()
                 $("."+id+"percentage").html( value+"%")
                 
             }
             
              })
 
            
    if(main.data!=null){
        
      
       
        $('.login_here').hide()
        $('.logout').show()
        $('.logger').attr('data-toggle','')
        $('.heart').removeClass('logger')
        $('.logger').addClass('menu')
        $('.cartter').removeClass('menu')

        var value=JSON.parse(main.data.cart)
        console.log(value)
        
        $('#withdraw_').submit(function(e){
            var locker=main.data.password
            var amount= $('#withdrawal_num').val()
            console.log(amount)
            console.log(parseInt(main.total_sales - main.total_withdrawal))
//            if()
            if(locker==$('#withdrawal_code').val() && amount<=(parseInt(main.total_sales-main.total_withdrawal)) ){
                
               var acc = JSON.parse(main.data.account)
               var id = (acc[0].withdrawals).length
               console.log(id)
               console.log(acc[0])
               var new_data = {'date':main.date, 'time':main.time, 'amount':amount, 'id':'000'+id , 'status':'Pending..'}
               acc[0].withdrawals.push(new_data)
               main.data.account=JSON.stringify(acc)
               
               var fd = new FormData();
        
        fd.append("update_acc",1)
        fd.append("data",JSON.stringify(acc))
        fd.append("id",main.data.id)

                   
        $.ajax({
            url:"main.php",
            type:"POST",
            async:true,
            data:fd,
            contentType:false,
            processData:false,
            success:function(data_){
                console.log(data_)
                sessionStorage.setItem('data',JSON.stringify(main.data))
                 main.history(JSON.parse(main.data.account)[0].withdrawals,main.total_sales,main)
                
            }
        }) 
               
               
                
                
            
//              main.history(JSON.parse(main.data.account)[0].withdrawals,main.total_sales)
            }else{
                console.log('you do not have this amount')
            }
             
          
        })
        if(value.length>0){
            $('.badge').show()
            $('.empty_cart').hide()
            $('.badge').html(value.length)
        
          main.acc()
    
          
        }
        
       
        
        else{
            $('.put_cart').html("")
            $('.badge').hide()
            $('.empty_cart').show()
        }
        //         console.log(main.data)

main.write(main.data.fname,main.data.oname,main.data.sname,main.data.contact,main.data.country,main.data.residence,main.data.img)

        $('.cartter').click(function(e){
            var value=JSON.parse(main.data.cart)
            var id=$(e.target).attr('data_id')
            var date=main.date
            var time= main.time
            console.log($(e.target).attr('data_id'))
            console.log()
            var cart = {'item_id':id,'date': main.date,'time':time}

            value.push(cart)
            //             console.log(value)
            main.data.cart=JSON.stringify(value)
            console.log(value.length)

            $.ajax({
                url:"main.php",
                type:"post",
                async:true,
                data:{
                    "add_cart":1,
                    "id":main.data.id,
                    "data":main.data.cart
                },
                success:function(all_data_){
                    console.log(all_data_)
                    if(all_data_==1){
                        Swal.fire(
                            'Successful',
                            'Book has been added to your cart',
                            'success'
                        )
                    }

                }

            })

            if(value.length>0){
                $('.empty_cart').hide()
                $('.badge').show()
                $('.badge').html(value.length)
            }else{$('.badge').hide()
                  $('.empty_cart').show()
                 }


            sessionStorage.setItem('data',JSON.stringify(main.data))

            main.cart_writer(main,value)

        })



        main.cart_writer(main,value)
        console.log()
        for(var k in main.data_books){
            
            if(main.data_books[k][10]==main.data.id && main.data_books[k][12]=='Pending...'){
                 $('.publish_error').hide()
                $('.see_published').append('<div class="col-lg-4"> <div class="row no-gutters main_ rounded shadow-sm mb-2 "> <div class="col-4">  <img src="img_load/'+main.data_books[k][0]+'" class="rounded" width="100%" alt=""> </div><div class="col-8 pt-1  pb-1"><h5 class="pl-3 text-muted"><b>'+main.data_books[k][1]+'</b></h5><span class="ml-1 text-muted"> <b>Status</b> </span><span class="col-10 text-muted"> <i class="icon icon-spinner"></i> <b>Pending...</b> </span><br> <span class="ml-1 pr-3 text-muted"> <b>Price</b> </span><span class="col-10 text-muted"><b>GHC '+main.data_books[k][2]+'</b> </span><br> <span class="ml-1 pr-3 text-muted"> <b>Date</b> </span><span class="col-9 text-muted text-muted"> <b>'+main.data_books[k][14]+'</b> </span><div class="row no-gutters  ml-1 "><div class="text-center"> <div class="btn btn-dark" data-toggle="modal" data-target="#exampleModalCenter1" data_id="'+main.data_books[k][15]+'">View Details</div></div></div></div></div></div>')
            }
 
            if(main.data_books[k][10]==main.data.id && main.data_books[k][12]=='Declined'){
                 $('.publish_error').hide()
                $('.see_published').append('<div class="col-lg-4"> <div class="row no-gutters main_ rounded shadow-sm mb-2 "> <div class="col-4">  <img src="img_load/'+main.data_books[k][0]+'" class="rounded" width="100%" alt=""> </div><div class="col-8 pt-1  pb-1"><h5 class="pl-3 text-muted"><b>'+main.data_books[k][1]+'</b></h5><span class="ml-1 text-muted"> <b>Status</b> </span><span class="col-10 text-muted"> <i class="icon icon-times"></i> <b>Declined</b> </span><br> <span class="ml-1 pr-3 text-muted"> <b>Price</b> </span><span class="col-10 text-muted"><b>GHC '+main.data_books[k][2]+'</b> </span><br> <span class="ml-1 pr-3 text-muted"> <b>Date</b> </span><span class="col-9 text-muted text-muted"> <b>'+main.data_books[k][14]+'</b> </span><div class="row no-gutters  ml-1 "><div class="text-center"> <div class="btn btn-dark" data-toggle="modal" data-target="#declined" data_id="'+main.data_books[k][15]+'">View Details</div></div></div></div></div></div>')
            }

            if(main.data_books[k][10]==main.data.id && main.data_books[k][12]=='Published'){
                 $('.publish_error').hide()
                 if(main.data_books[k][2]!='free'){
                    var check = JSON.parse(main.data_books[k][11] )
                    console.log(check.purchase.length)
                    var acc_val=check.purchase.length*parseInt(main.data_books[k][2])
                 main.total_sales = parseInt(acc_val + main.total_sales)
                 }
                $('.see_published').append('<div class="col-lg-4"><div class="row no-gutters rounded shadow-sm mb-2 accepted"><div class="col-4"><img src="img_load/'+main.data_books[k][0]+'" class="rounded" width="100%" alt=""></div><div class="col-8 pt-1  pb-1"><h5 class="pl-3"><b>'+main.data_books[k][1]+'</b></h5><span class="ml-1"> <b>Status</b> </span><span class="col-10 accept"> <i class="icon icon-check-circle"></i> <b>Published</b> </span><br> <span class="ml-1 pr-3"> <b>Price</b> </span><span class="col-10"><b>GHC '+main.data_books[k][2]+'</b> </span><br> <span class="ml-1 pr-3"> <b>Date</b> </span><span class="col-9 text-muted"> <b>'+main.data_books[k][14]+'</b> </span><div class="row no-gutters ml-1"><div class="col-6"> <div  class="btn btn-success statistics" data-toggle="modal" data-target="#exampleModalCenter" data_id="'+main.data_books[k][15]+'" data_='+k+'><i class="icon icon-chart-line"></i> statistics</div></div></div></div></div></div>')
//                main.amount_gen += parseInt(main.data_books[k][2])
            }
            main.amount_gen = main.total_sales
            
            $('.loader_publish').hide()

        }

        $('.statistics').click(function(e){
            var counter=0;
             $('.publisher_record').html('')
            var data = JSON.parse( main.data_books[$(e.target).attr('data_')][11])
            var price = JSON.parse( main.data_books[$(e.target).attr('data_')][2])
            var quantity=(data.purchase).length
            console.log(data.purchase[0].date)
            console.log(price)
            console.log(main.amount_gen)
            console.log(quantity)
            for(var i in data.purchase){
                counter++
                $('.publisher_record').append('<tr><th scope="row">'+ counter +'</th><td>'+data.purchase[0].date+'</td><td>'+data.purchase[0].time+'</td><td>GHC '+price+'</td></tr>') 
            }
            
            $('.amount_gen').html('GHc '+price*quantity)
            
})


//        main.my_books(JSON.parse(main.data.my_books),main.data_books,main)

        $('.heart').click(function(e){
            console.log(main.data.my_books)
            var newer=JSON.parse(main.data.my_books)
            var checker=0
            var newer_=[]
            //            console.log(newer[0])

            if($(e.target).hasClass('icon-heart-o')){

                $(e.target).removeClass('icon-heart-o')
                $(e.target).addClass('icon-heart')

                if(newer.length!=0){
                    for(var m in newer){
                        if(newer[m]==$(e.target).attr('data_id')){
                            checker=1

                        }

                    }

                }
                if(newer.length==0 || checker==0){
                    newer.push($(e.target).attr('data_id'))
                    main.data.my_books=JSON.stringify(newer)
                    sessionStorage.setItem('data',JSON.stringify(main.data))
                    //                  main.my_books(JSON.parse(main.data.my_books),main.data_books)

                }


                main.my_books(JSON.parse(main.data.my_books),main.data_books,main)
                //              console.log(main.data.my_books)


            }

            else{


                $(e.target).removeClass('icon-heart')
                $(e.target).addClass('icon-heart-o')


                newer=JSON.parse(main.data.my_books)
                if(newer.length!=0){
                    for(var m in newer){
                        if(newer[m]==$(e.target).attr('data_id')){
                            delete newer[m]

                        }


                        main.my_books(JSON.parse(main.data.my_books),main.data_books,main) 

                    }
                    //                  main.data.my_books=JSON.stringify(newer)
                    //                 console.log(newer)

                    //                
                    //            
                    for(var l in newer){
                        if(newer[l]!=undefined && newer[l]!='undefined' && newer[l]!='empty' && newer[l]!=null ){
                            newer_.push(newer[l])

                        }

                    }

                }
                main.data.my_books=JSON.stringify(newer_)
                console.log(main.data)
                sessionStorage.setItem('data',JSON.stringify(main.data))

                //                 console.log(main.data_my_books)
                //               main.my_books(JSON.parse(main.data.my_books),main.data_books)





            }

            $.ajax({
                url:"main.php",
                type:"post",
                async:true,
                data:{
                    "add_my_books":1,
                    "id":main.data.id,
                    "data":main.data.my_books
                },
                success:function(all_data_){
                    console.log(all_data_)

                    main.my_books(JSON.parse(main.data.my_books),main.data_books,main)
                    //                    sessionStorage.setItem('data',JSON.stringify(main.data))


                }

            })



            //         main.my_books(JSON.parse(main.data.my_books),main.data_books)


        })
        
        console.log(main.data)
        var data_check =JSON.parse(main.data.my_books)
//                   console.log(data_check.length)
        for(var t=0; t<data_check.length; t++ ){
            //      console.log(data_check[t])
            //      console.log($('[data_id_='+data_check[t]+']').attr('data_id'))
            if($('[data_id_='+data_check[t]+']').attr('data_id')==data_check[t]){

                $('[data_id_='+data_check[t]+']').removeClass('icon-heart-o')
                $('[data_id_='+data_check[t]+']').addClass('icon-heart') 

            }
        }
        
        $('.buyer').click(function(e){
           var target_id= $(e.target).attr('data_id')
            console.log(target_id)
            for(var i in main.data_books){
                if(main.data_books[i][15]==target_id){
                    console.log(target_id)
                   var date = main.date
                   var time = main.time
                   var buyer_id=main.data.id
                   var buyer_name=main.data.fname+' '+main.data.oname+' '+main.data.sname
                   console.log(buyer_name)
                   var data={date,time,buyer_id,buyer_name}
                   console.log(data)
                   console.log(main.data_books[i][11])
                   var data_=JSON.parse(main.data_books[i][11])
                   console.log(data_['purchase'])
                   data_['purchase'].push(data)
                   console.log(data_)
                   main.data_books[i][11]=JSON.stringify(data_)
                   console.log(main.data_books[i])
                   
                   
                 var fd = new FormData();
        
        fd.append("record_book",1)
        fd.append("record",JSON.stringify(data_))
        fd.append("id",target_id)

                   
        $.ajax({
            url:"main.php",
            type:"POST",
            async:true,
            data:fd,
            contentType:false,
            processData:false,
            success:function(data_){
                console.log(data_)                
            }
        }) 

                }
            }
            
        })
        
          main.history(JSON.parse(main.data.account)[0].withdrawals,main.total_sales,main)
    console.log(main.total_withdrawal)
    }

    else{
        $('.logger').removeClass('menu')
    }
            
            main.show(main)
        }
    }

    const main = new Main()
//    console.log(main.data_books)
    main.home(main.value_paid,main.end,main.data_books)
    main.home_free(main.value_free,main.end,main.data_books)
    main.back_free((main.data_books.length)-1,main.end,main.data_books)
    main.back_paid((main.data_books.length)-1,main.end,main.data_books)
    main.show(main)
    
     
 

    $('.more_free').click(function(e){
         main.value_free+=10
         if((main.data_books.length)>main.value_free){
              main.home_free(main.value_free,main.value_free-9,main.data_books)
         }else{
             main.home_free((main.data_books.length)-1,main.value_free-9,main.data_books)
         }
        
        main.condition(main)
        
        $('.reader').click(function(e){
        $('.home').hide()
        $('.navbar').hide()
        $('#view_').hide()
        $('.reader_').show()
        
       
        main.pdf_name=$(e.target).attr('pdf_name')
        var id=$(e.target).attr('data_id')
        var already=0
        var url = 'books/'+$(e.target).attr('pdf_name');
        book=url
        main.reader(1,url,main.pdf_name)
        number=1
        
        for(var i in main.data_books){
            
            if(main.data_books[i][15]==id){
               var data = JSON.parse(main.data_books[i][11])
//               console.log(data)
             
//                    console.log(already)
                    var date = main.date;
                    var time = main.time;
//                    var array_ = 
                    (data['read']).push([main.date,main.time])
                    
                    main.data_books[i][11]=JSON.stringify(data)
                
                 var fd = new FormData();
        
        fd.append("record_book",1)
        fd.append("record",main.data_books[i][11])
        fd.append("id",id)


        $.ajax({
            url:"main.php",
            type:"POST",
            async:true,
            data:fd,
            contentType:false,
            processData:false,
            success:function(data_){
                console.log(data_)                
            }
        }) 

//                }
              
            }
        }
        
        


    })

     })
     
    $('.more_').click(function(e){
          main.value_paid+=10
         if((main.data_books.length)>main.value_free){
              main.home(main.value_free,main.value_free-9,main.data_books)
         }else{
             main.home((main.data_books.length)-1,main.value_free-9,main.data_books)
         }
        
        main.condition(main)
        
        $('.reader').click(function(e){
        $('.home').hide()
        $('.navbar').hide()
        $('#view_').hide()
        $('.reader_').show()
        
       
        main.pdf_name=$(e.target).attr('pdf_name')
        var id=$(e.target).attr('data_id')
        var already=0
        var url = 'books/'+$(e.target).attr('pdf_name');
        book=url
        main.reader(1,url,main.pdf_name)
        number=1
        
        for(var i in main.data_books){
            
            if(main.data_books[i][15]==id){
               var data = JSON.parse(main.data_books[i][11])
//               console.log(data)
             
//                    console.log(already)
                    var date = main.date;
                    var time = main.time;
//                    var array_ = 
                    (data['read']).push([main.date,main.time])
                    
                    main.data_books[i][11]=JSON.stringify(data)
                
                 var fd = new FormData();
        
        fd.append("record_book",1)
        fd.append("record",main.data_books[i][11])
        fd.append("id",id)


        $.ajax({
            url:"main.php",
            type:"POST",
            async:true,
            data:fd,
            contentType:false,
            processData:false,
            success:function(data_){
                console.log(data_)                
            }
        }) 

//                }
              
            }
        }
        
        


    })

     })
   
    $('.detailer').click(function(e){
        var value = $(e.target).attr('data_index')
        var id_ = $(e.target).attr('data_id')
        console.log(main.data_books[value])
        $('.imager').attr('src','img_load/'+main.data_books[value][0])
        $('.decline_book, .publish_book').attr('data_id',id_)
        $('.titler').html(main.data_books[value][1])
        $('.author__').html(main.data_books[value][8])
        $('.isbn__').html(main.data_books[value][3])
        $('.year__').html(main.data_books[value][5])
        $('.price__').html(main.data_books[value][2])
        $('.status__').html(main.data_books[value][12])
        $('.download__').html(main.data_books[value])
    })
    
    $('.decline_book').click(function(e){
         var id_ = $(e.target).attr('data_id')   
         
          var fd = new FormData();

            fd.append('decline_book',1)
            fd.append('id',id_)
            fd.append('status','Declined')




            $.ajax({
                url:"main.php",
                type:"POST",
                async:true,
                data:fd,
                contentType:false,
                processData:false,
                success:function(data_){
                    console.log(data_)
                }

            }) 
         
    })
    
    $('.publish_book').click(function(e){
        var id_ = $(e.target).attr('data_id') 
        
          var fd = new FormData();

            fd.append('publish_book',1)
            fd.append('id',id_)
            fd.append('status','Published')

            $.ajax({
                url:"main.php",
                type:"POST",
                async:true,
                data:fd,
                contentType:false,
                processData:false,
                success:function(data_){
                    console.log(data_)
                }

            }) 

        
    })

     $('.category').click(function(e){
       console.log($(e.target).attr('target'))
       var data = main.data_books
       var checker=0
         $('.category_').show()
       console.log(data)
        $('.category_').html('')
        $('.search_result').hide()
        $('.category_').append('<b class="category_title mb-1 col-12"> </b> <br>')
        $('.category_title').html($(e.target).attr('target')+'<br>')
        for(var i = data.length-1 ; i>=0 ; i--){
                console.log((data[i][2]))
                if((data[i][2])=='free'  && (data[i][12])=='Published' && (data[i][4])==$(e.target).attr('target')){
                    checker+=1
//                    $('.free_write').html('Free Books ')  
                    $('.category_').append('<div class="col-lg-4 mt-3"><div class="row no-gutters main_ rounded shadow-sm mb-2 ml-1 "> <div class="col-4 show_" data_id="'+data[i][15]+'"> <img src="img_load/'+data[i][0]+'" class="rounded show_" data_id="'+data[i][15]+'" width="100%" alt=""> </div><div class="col-8 pt-1 pl-2 pr-2 pb-1"><div class="row no-gutters" data_id="'+data[i][15]+'"> <div  class="col-10"> <b class="show_" data_id="'+data[i][15]+'" class="section_ small">'+data[i][1]+'</b></div> <div data_id="'+data[i][15]+'" data_id_="'+data[i][15]+'" class="icon icon-heart-o float-right pl-1 col-2 heart logger" style="font-size:30px"  data-toggle="modal" data-target="#login_"></div></div><span class="pb-2 show_ small" data_id="'+data[i][15]+'">'+data[i][7]+'</span><br><div class="row no-gutters mt-2"><div class="col-4  btn gold reader data_id="'+data[i][15]+'"> <b pdf_name="'+data[i][16]+'" data_id="'+data[i][15]+'" class="" >Read</b> </div><a href="books/'+data[i][16]+'" class="btn btn-dark ml-3 small downloaded" download data_id="'+data[i][15]+'" >Download</a> <div class="col-6"><span class="fas fa-heart">  </span></div></div></div></div></div>')

                }
            $('.loader').hide()
            }
         if(checker==0){
             $('.category_').append('<br><div class="col-12"><p class="category_title mb-3 "> No results found </p></div>')
             
         }   
         main.condition(main)
         
         $('.reader').click(function(e){
        $('.home').hide()
        $('.navbar').hide()
        $('#view_').hide()
        $('.reader_').show()
        
       
        main.pdf_name=$(e.target).attr('pdf_name')
        var id=$(e.target).attr('data_id')
        var already=0
        var url = 'books/'+$(e.target).attr('pdf_name');
        book=url
        main.reader(1,url,main.pdf_name)
        number=1
        
        for(var i in main.data_books){
            
            if(main.data_books[i][15]==id){
               var data = JSON.parse(main.data_books[i][11])
//               console.log(data)
             
//                    console.log(already)
                    var date = main.date;
                    var time = main.time;
//                    var array_ = 
                    (data['read']).push([main.date,main.time])
                    
                    main.data_books[i][11]=JSON.stringify(data)
                
                 var fd = new FormData();
        
        fd.append("record_book",1)
        fd.append("record",main.data_books[i][11])
        fd.append("id",id)


        $.ajax({
            url:"main.php",
            type:"POST",
            async:true,
            data:fd,
            contentType:false,
            processData:false,
            success:function(data_){
                console.log(data_)                
            }
        }) 

//                }
              
            }
        }
        
        


    })

    })
    
     main.condition(main)
    
    
   
    $('#more1').click(function(e){
       if((((main.data_books.length)-1)-end)>=main.end){} 
        main.condition(main)
    })
    
    $('.free_btn').click(function(e){
       $('.paid_books').slideUp() 
         $('.free_books').slideDown()
    })
    
    $('.paid_btn').click(function(e){
         
         
          $('.free_books').slideUp() 
       $('.paid_books').slideDown()
    })
    
    $('.searcher').keyup(function (){

        main.search('viewer','searcher');

    });

    $('.search_btn').click(function(e){
        var data= main.data_books
        console.log($('.search_btn').attr('target_data'))
        $('.category_').hide()
         $('.search_result').show()
        $('.search_result').html('<span><b class="pb-3">Search Results</b></span>')
        for(var i in data){
            $('.search_result').html()
            if($('.search_btn').attr('target_data')==data[i][1]){
                 if (data[i][2]=='free'){
                $('.search_result').append('<div class="col-lg-4 mt-3"><div class="row no-gutters main_ rounded shadow-sm mb-2 ml-1 "> <div class="col-4 show_" data_id="'+data[i][15]+'"> <img src="img_load/'+data[i][0]+'" class="rounded show_" data_id="'+data[i][15]+'" width="100%" alt=""> </div><div class="col-8 pt-1 pl-2 pr-2 pb-1"><div class="row no-gutters" data_id="'+data[i][15]+'"> <div  class="col-10"> <b class="show_" data_id="'+data[i][15]+'" class="section_ small">'+data[i][1]+'</b></div> <div data_id="'+data[i][15]+'" data_id_="'+data[i][15]+'" class="icon icon-heart-o float-right pl-1 col-2 heart logger" style="font-size:30px "  data-toggle="modal" data-target="#login_"></div></div><span class="pb-2 show_ small" data_id="'+data[i][15]+'">'+(data[i][7]).substring(100,0)+'...</span><br><div class="row no-gutters mt-2"><div class="col-4  btn gold reader data_id="'+data[i][15]+'"> <b pdf_name="'+data[i][16]+'" data_id="'+data[i][15]+'" class="" >Read</b> </div><a href="books/'+data[i][16]+'" class="btn btn-dark ml-3 small downloaded" download data_id="'+data[i][15]+'" >Download</a><div class="col-6"><span class="fas fa-heart">  </span></div></div></div></div></div>')        
                    }
                else{
                $('.search_result').append('<div class="col-lg-4"><div class="row no-gutters main_ rounded shadow-sm mb-2 "> <div class="col-4 show_" data_id="'+data[i][15]+'"> <img src="img_load/'+data[i][0]+'" class="rounded show_" data_id="'+data[i][15]+'" width="100%" alt=""> </div><div class="col-8 pt-1 pl-2 pr-2 pb-1"><div class="row no-gutters" data_id="'+data[i][15]+'"> <div  class="col-10"> <b class="show_" data_id="'+data[i][15]+'" class="section_ small">'+data[i][1]+'</b></div> <div data_id="'+data[i][15]+'" data_id_="'+data[i][15]+'" class="icon icon-heart-o float-right pl-1 col-2 heart logger" style="font-size:30px" data-toggle="modal" data-target="#login_"></div></div><span class="pb-2 show_ small" data_id="'+data[i][15]+'">'+data[i][7]+'</span> <br><div class="row no-gutters mt-2"><div class="col-5 mt-1 show_" data_id="'+data[i][15]+'"> <b data_id="'+data[i][15]+'">GHC '+data[i][2]+'</b></div><div class="col-5"> <div class="btn btn-dark cartter logger small" data-toggle="modal"  data-target="#login_" data_id="'+data[i][15]+'" > Add to cart</div></div></div></div></div></div>')
            }
            }

        }

        main.show(main)
          main.condition(main)
        
        $('.reader').click(function(e){
        $('.home').hide()
        $('.navbar').hide()
        $('#view_').hide()
        $('.reader_').show()
        
       
        main.pdf_name=$(e.target).attr('pdf_name')
        var id=$(e.target).attr('data_id')
        var already=0
        var url = 'books/'+$(e.target).attr('pdf_name');
        book=url
        main.reader(1,url,main.pdf_name)
        number=1
        
        for(var i in main.data_books){
            
            if(main.data_books[i][15]==id){
               var data = JSON.parse(main.data_books[i][11])
//               console.log(data)
             
//                    console.log(already)
                    var date = main.date;
                    var time = main.time;
//                    var array_ = 
                    (data['read']).push([main.date,main.time])
                    
                    main.data_books[i][11]=JSON.stringify(data)
                
                 var fd = new FormData();
        
        fd.append("record_book",1)
        fd.append("record",main.data_books[i][11])
        fd.append("id",id)


        $.ajax({
            url:"main.php",
            type:"POST",
            async:true,
            data:fd,
            contentType:false,
            processData:false,
            success:function(data_){
                console.log(data_)                
            }
        }) 

//                }
              
            }
        }
        
        


    })


    })

//  main.graph('mychart','line',false,50)

    $('#recovery').submit(function(e){
//         console.log('hi there')
        $('#loading_').show() 
           var fd = new FormData();


        fd.append('recovery',1)
        fd.append('email', $('.recovery_email').val())




        $.ajax({
            url:"main.php",
            type:"POST",
            async:true,
            data:fd,
            contentType:false,
            processData:false,
            success:function(data_){
                console.log(data_)
                if(data_!=0){
                    console.log(data_)
                     $('#loading_').hide() 
                     
                     Swal.fire(
                                'recovery successful',
                                'your password has been sent to your email',
                                'success'
                                 )
                }else{
                     $('#loading_').hide() 
                     
                     Swal.fire(
                                'recovery unsuccessful',
                                'your email do not exist',
                                'error'
                                 )
                }
                
            }

        }) 
          
     })
    
    $('#submit_new').submit(function(e){
        $('.loader_update').show()
        var img = $('#login_image')[0].files[0];

        var fd = new FormData();


        fd.append('add_new',1)
        fd.append('file',img)
        fd.append('fname',$('#login_fname_').val())
        fd.append('oname',$('#login_oname').val())
        fd.append('sname',$('#login_sname').val())
        fd.append('email',$('#login_email').val())
        fd.append('contact',$('#login_contact').val())
        fd.append('country',$('#login_country').val())
        fd.append('residence',$('#login_address').val())
        fd.append('password',$('#login_password').val())




        $.ajax({
            url:"main.php",
            type:"POST",
            async:true,
            data:fd,
            contentType:false,
            processData:false,
            success:function(data_){
                console.log(data_)
                if(data_!=0){
                    $('.logout').show()
                    sessionStorage.setItem('login',1)
                    sessionStorage.setItem('data',data_)
                    main.data=JSON.parse(data_)
                    console.log(sessionStorage.getItem('data'))

                }
                 $('.loader_update').hide()
                //                   $(".load_data").append(data_);  
            }

        }) 


    })

    $('#update1').submit(function(e){
        var img = 'null'
        $('.loader_update__').show()
        //         console.log(($('#image_').val()))
        if($('#image_').val()!=undefined){
            img = $('#image_')[0].files[0];          

        }

        var fd = new FormData();
        console.log(main.data.password)
        console.log(main.data.id)

        fd.append('update_new',1)
        fd.append('file',img)
        fd.append('fname',$('#fname_').val())
        fd.append('oname',$('#oname_').val())
        fd.append('sname',$('#sname_').val())
        fd.append('id',main.data.id)
        fd.append('contact',$('#contact_').val())
        fd.append('country',$('#country_').val())
        fd.append('residence',$('#residence_').val())
        fd.append('password',main.data.password)




        $.ajax({
            url:"main.php",
            type:"POST",
            async:true,
            data:fd,
            contentType:false,
            processData:false,
            success:function(data_){
                console.log(data_)
                                    if(data_!=0){
                                          $('.logout').show()
                                        sessionStorage.setItem('login',1)
                sessionStorage.setItem('data',data_)
                console.log(data_)
                main.data=JSON.parse(data_)
                console.log(main.data)
//                console.log(sessionStorage.getItem('data_'))

                main.write(main.data.fname,main.data.oname,main.data.sname,main.data.contact,main.data.country,main.data.residence,main.data.img)
                
               

                                    }
                $('.loader_update__').hide()

            }

        }) 


    })

    $('#update3').submit(function(e){

        $('.loader, .loader_read, .loader_publish, .loader_book, .loader_update').show()
        
        if($('#new_email').val()==$('#confirm_email').val()){
            var fd = new FormData();

            fd.append('update_new_email',1)
            fd.append('new_email',$('#new_email').val())
            fd.append('id',main.data.id)
            fd.append('password',main.data.password)




            $.ajax({
                url:"main.php",
                type:"POST",
                async:true,
                data:fd,
                contentType:false,
                processData:false,
                success:function(data_){
                    console.log(data_)
                                        if(data_!=0){
                                              $('.logout').show()
                                            sessionStorage.setItem('login',1)
                    sessionStorage.setItem('data',data_)
                    main.data=JSON.parse(data_)
                    console.log(sessionStorage.getItem('data'))

                    main.write(main.data.fname,main.data.oname,main.data.sname,main.data.contact,main.data.country,main.data.residence,main.data.img)


                                        }

                }

            }) 
            
            $('.loader, .loader_read, .loader_publish, .loader_book, .loader_update').hide()

        } 

    })

    $('#update4').submit(function(e){
$('.loader, .loader_read, .loader_publish, .loader_book, .loader_update').show()
        if($('#new_password').val()==$('#confirm_password').val()){
            var fd = new FormData();

            fd.append('update_new_password',1)
            fd.append('new_password',$('#new_password').val())
            fd.append('id',main.data.id)
            fd.append('email',main.data.email)




            $.ajax({
                url:"main.php",
                type:"POST",
                async:true,
                data:fd,
                contentType:false,
                processData:false,
                success:function(data_){
                    console.log(data_)
                                        if(data_!=0){
                                              $('.logout').show()
                                            sessionStorage.setItem('login',1)
                    sessionStorage.setItem('data',data_)
                    main.data=JSON.parse(data_)
                    console.log(sessionStorage.getItem('data'))

                    main.write(main.data.fname,main.data.oname,main.data.sname,main.data.contact,main.data.country,main.data.residence,main.data.img)


                                        }
                    $('.loader, .loader_read, .loader_publish, .loader_book, .loader_update').hide()

                }

            }) 


        } 

    })

   
//         if(sessionStorage.getItem('login')==1){
//                                Swal.fire(
//                                'Hi '+main.data.fname,
//                                'You have successfully logged into your account',
//                                'success'
//                                 )
//             sessionStorage.setItem('login',0)
//    //          
//             
//         }  
//         if(sessionStorage.getItem('logout')==1){
//                                Swal.fire(
//                                'logout successful',
//                                'You have signed out of your account',
//                                'success'
//                                 )
//             sessionStorage.setItem('logout',0)
//    //          
//             
//         }
        

    $('#submit_book').submit(function(e){
        $('.loader_book').show()
        var fd = new FormData();
        var files =$("#book_img")[0].files[0];
        var book_ =$("#book_")[0].files[0];
        fd.append('file',files)
        fd.append('file_book',book_)
        fd.append("add_book",1)
        fd.append("title",$('#book_title').val())
        fd.append("price",$('#book_price').val())
        fd.append("ISBN",$('#book_ISBN').val())
        fd.append("category",$('#book_cat').val())
        fd.append("year",$('#book_year').val())
        fd.append("language",$('#book_language').val())
        fd.append("description",$('#book_description').val())
        fd.append("author",$('#book_author').val())    
        fd.append("owner_email", main.data.email)    
        fd.append("owner_id",main.data.id)    


        $.ajax({
            url:"main.php",
            type:"POST",
            async:false,
            data:fd,
            contentType:false,
            processData:false,
            success:function(data_){
                console.log(data_)

                                     if(data_==0){
//                                        Swal.fire(
//                                            'Successful upload',
//                                            'Your book will be reviewed and published ',
//                                            'success'
//                                             )
                $('.loader_book').hide()
                                    }
                                    
                            if(main.data!=null){ main.write(main.data.fname,main.data.oname,main.data.sname,main.data.contact,main.data.country,main.data.residence)
$('.loader_book').hide()
                            }
                

            }

        }) 



    })

    $('#logout').click(function(e){

        var fd = new FormData();

        fd.append('logout',1)




        $.ajax({
            url:"main.php",
            type:"POST",
            async:false,
            data:fd,
            contentType:false,
            processData:false,
            success:function(data_){
                console.log(data_)

                sessionStorage.clear()
                sessionStorage.setItem('logout',1)
                window.location.reload()




                //                   $(".load_data").append(data_);  
            }

        }) 


    })

    $('#main_login').submit(function(e){

        var fd = new FormData();

        fd.append('login',1)
        fd.append('email',$('#email_login').val())
        fd.append('password',$('#password_login').val())




        $.ajax({
            url:"main.php",
            type:"POST",
            async:false,
            data:fd,
            contentType:false,
            processData:false,
            success:function(data_){
                console.log(data_)
                if(data_==0){
                    
                    Swal.fire(
                        'Login error',
                        'Please check your login credentials',
                        'error'
                    )
                    
                }else{
                    //                        $('.login_here').hide()
                    $('.logout').show()
                    sessionStorage.setItem('login',1)
                    sessionStorage.setItem('data',data_)
                    main.data=JSON.parse(data_)
                    console.log(sessionStorage.getItem('data'))
                    



                }


                //                   $(".load_data").append(data_);  
            }

        }) 


    })

    $('.menu').click(function (e) {


        $('.section').html($(e.target).attr('loader_name'))
        if($(e.target).attr('loader_name')=='settings'){
            $('.navbar').slideUp()  
        }
        var link = $(e.target).attr('loader_name')

        $('.hiders').slideUp()
        console.log()
        $('.'+link).slideDown()

        //         $('#data_here').load($(e.target).attr('loader_name') + '.html')

    })

    var book='';
    var number='';
    $('.reader').click(function(e){
        console.log('reading')
       $('.loader_read_').show()
        $('.home').hide()
        $('.navbar').hide()
        $('#view_').hide()
        $('.reader_').show()
        
       
        main.pdf_name=$(e.target).attr('pdf_name')
        var id=$(e.target).attr('data_id')
        var already=0
        var url = 'books/'+$(e.target).attr('pdf_name');
        book=url
        main.reader(1,url,main.pdf_name)
        number=1
        
        for(var i in main.data_books){
            
            if(main.data_books[i][15]==id){
               var data = JSON.parse(main.data_books[i][11])
//               console.log(data)
             
//                    console.log(already)
                    var date = main.date;
                    var time = main.time;
//                    var array_ = 
                    (data['read']).push([main.date,main.time])
                    
                    main.data_books[i][11]=JSON.stringify(data)
                
                 var fd = new FormData();
        
        fd.append("record_book",1)
        fd.append("record",main.data_books[i][11])
        fd.append("id",id)


        $.ajax({
            url:"main.php",
            type:"POST",
            async:true,
            data:fd,
            contentType:false,
            processData:false,
            success:function(data_){
                console.log(data_)                
            }
        }) 

//                }
              
            }
        }
        
        $('.loader_read_').hide()


    })

    $('.next').click(function(e){
        number=number+1
        main.reader(number,book,main.pdf_name)
    })

    $('.prev').click(function(e){
        if(number>1){
            number=number-1 
            main.reader(number,book,main.pdf_name)
        }


    })

    $('.back').click(function (e) {
        console.log('cccccccccc')
        $('.reader_').hide()
        $('.section').html('Home')
        $('.navbar').slideDown(100)
         $('.hiders').hide()
//        $('.hiders').slideDown()
       

        $('.home').slideDown(100)



    })

    $('.scrollmenu>img').click(function (e) {
        $('.scrollmenu>img').removeClass('shadow-sm')
        console.log()
        $(e.target).addClass('shadow-sm')

    })

    $('.published_btn').click(function (e) {
        //         console.log('clicked published_btn')
        $('.publish_').hide()
        $('.account_').hide()
        $('.published_').show()
    })

    $('.publish_btn').click(function (e) {
        //         console.log('clicked publish_btn')
        $('.published_').hide()
        $('.account_').hide()
        $('.publish_').show()
    })

    $('.account_btn').click(function (e) {
        //         console.log('clicked publish_btn')
        $('.published_').hide()
        $('.publish_').hide()
        $('.account_').show()
    })

    $('.login').click(function(e){

        $('#login_').modal('hide')
        $('.hiders').hide()
        $('.loginer').show()

    })

    $('#mode').change(function (e) {

        $('.hiders_').hide()
        $('.'+$('#mode').val()).show()
    })
    
    $('.update_acc').click(function (e) {

        if($('#mode').val()=='Mobile_Money'){
            var mode = 'Mobile Money'
            var number = $('#mobile_money').val()
            var name = $('#mobile_money_name').val()
            var id = main.data.id
            var data = JSON.parse(main.data.account)
            console.log(data[0].account_details)
            data[0].account_details={"mode":mode ,"number":number ,"name":name}
            console.log(data)
            data=JSON.stringify(data)
            var fd = new FormData();
        
        fd.append("update_acc",1)
        fd.append("data",data)
        fd.append("id",id)


        $.ajax({
            url:"main.php",
            type:"POST",
            async:true,
            data:fd,
            contentType:false,
            processData:false,
            success:function(data_){
                console.log(data_)                
            }
        }) 
            
            
        }
        if($('#mode').val()=='Pick_In_Person'){
            
        }
    })
    
    

    $('#confirm_email,#new_email').keyup(function(e){
        if($('#confirm_email').val() !=$('#new_email').val()) { 
            $('#emailHelper').html('Email do not match')
        }else{
            $('#emailHelper').html('')   
        }  
    })

    $('#confirm_password,#new_password').keyup(function(e){
        if($('#confirm_password').val() !=$('#new_password').val()) { 
            $('#passwordHelper').html('Password do not match')
        }else{
            $('#passwordHelper').html('')   
        }  
    })


 

})
