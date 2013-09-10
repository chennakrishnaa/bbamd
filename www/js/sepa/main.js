define(['selectize', 'underscore'], function(selectize, _) {
    //console.log(selectize);
    $.getJSON("/rpc/sepa/getFundTransferEntryCharacteristics").done(function(xhr) {
            var items =[];
            _.map(xhr.value.originatorAccounts.ownOriginatorAccounts,
                function(accountType) {
                    return _.map(accountType,function(data){
                        items.push(data);
                    });
                });
            console.log(items);
            /*$('.select-account').selectize({
                options: items,
                optgroups:
            });*/
            var types = _.unique(_.map(items,function(item){return item.type;}));
            types = _.map(types,function(type) {return {value:type,label:type}});
            console.log(types);

            var $select = $('.select-account').selectize({
                options: items,
                optgroups:types,
                optgroupField:'type',
                optgroupLabelField:'label',
                optgroupValueField:'value',
                labelField:'alias',
                valueField:'iban',
                searchField:['alias','iban'],
                onChange:function(value){
                    var s = _.find(items,function(data) {return data.iban === value});
                    $('.selected-account .iban').text(s.iban);
                    $('.selected-account .amount').text(s.balance);
                    console.log(s);
                },
                render: {
                    option: function(data, escape) {
                        return '<div><div><span class="label">' + escape(data.alias) + '</span><span class="amount">'+ escape(data.balance) + '€</span></div><span class="caption">' + escape(data.iban) +'</span></div>';
                    }
                }
            });
            $('.select-animal').selectize({
                options: [{
                    class: 'mammal',
                    value: "dog",
                    name: "Dog"
                }, {
                    class: 'mammal',
                    value: "cat",
                    name: "Cat"
                }, {
                    class: 'mammal',
                    value: "horse",
                    name: "Horse"
                }, {
                    class: 'mammal',
                    value: "kangaroo",
                    name: "Kangaroo"
                }, {
                    class: 'bird',
                    value: 'duck',
                    name: 'Duck'
                }, {
                    class: 'bird',
                    value: 'chicken',
                    name: 'Chicken'
                }, {
                    class: 'bird',
                    value: 'ostrich',
                    name: 'Ostrich'
                }, {
                    class: 'bird',
                    value: 'seagull',
                    name: 'Seagull'
                }, {
                    class: 'reptile',
                    value: 'snake',
                    name: 'Snake'
                }, {
                    class: 'reptile',
                    value: 'lizard',
                    name: 'Lizard'
                }, {
                    class: 'reptile',
                    value: 'alligator',
                    name: 'Alligator'
                }, {
                    class: 'reptile',
                    value: 'turtle',
                    name: 'Turtle'
                }],
                optgroups: [{
                    value: 'mammal',
                    label: 'Mammal',
                    label_scientific: 'Mammalia'
                }, {
                    value: 'bird',
                    label: 'Bird',
                    label_scientific: 'Aves'
                }, {
                    value: 'reptile',
                    label: 'Reptile',
                    label_scientific: 'Reptilia'
                }],
                optgroupField: 'class',
                labelField: 'name',
                searchField: ['name'],
                render: {
                    optgroup_header: function(data, escape) {
                        console.log(data.label);
                        return '<div class="optgroup-header">' + escape(data.label) + ' <span class="scientific">' + escape(data.label_scientific) + '</span></div>';
                    }
                }
            });
        });

});