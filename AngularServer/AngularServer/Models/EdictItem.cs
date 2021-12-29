using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularServer.Models
{
    public class EdictItem
    {
        public int Id { get; set; }
        public string Header { get; set; }
        public string Description { get; set; }
        public int DayOfComplete { get; set; }
        public bool IsSelectEdictState { get; set; } = false;
        public ExecutorType ExecutedPerson { get; set; }
    }
}
