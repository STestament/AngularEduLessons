using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularServer.Models
{
    public class EdictService
    {
        private List<EdictItem> _edicts = new List<EdictItem>();
        public EdictService()
        {
            _edicts.Add(new EdictItem()
            {
                Id = 1,
                Header = "Повысить налоги",
                Description = "Мы вынуждены повысить налоги. В ближайшие пару месяцев сбор увеличится на 10%",
                DayOfComplete = 60,
                IsSelectEdictState = false,
                ExecutedPerson = ExecutorType.Advisor
            });
            _edicts.Add(new EdictItem()
            {
                Id = 2,
                Header = "Построить город",
                Description = "Нам нужен новый торговый центр - мы заложим новый город на границе королевства",
                DayOfComplete = 300,
                IsSelectEdictState = false,
                ExecutedPerson = ExecutorType.CityBuilder
            });
            _edicts.Add(new EdictItem()
            {
                Id = 3,
                Header = "Собрать армию",
                Description = "На нас нападают варвары! Собрать войско со всех земель!",
                DayOfComplete = 30,
                IsSelectEdictState = false,
                ExecutedPerson = ExecutorType.WarChief
            });
            _edicts.Add(new EdictItem()
            {
                Id = 4,
                Header = "Устроить пир",
                Description = "Устраиваем пир в честь заключения мирного договора",
                DayOfComplete = 20,
                IsSelectEdictState = false,
                ExecutedPerson = ExecutorType.Advisor
            });
            _edicts.Add(new EdictItem()
            {
                Id = 5,
                Header = "Устроить турнир",
                Description = "Созвать всех рыцарей! Награда - сундук золота",
                DayOfComplete = 50,
                IsSelectEdictState = false,
                ExecutedPerson = ExecutorType.Advisor
            });
        }

        public EdictItem[] GetEdicts()
        {
            return _edicts.ToArray();
        }
        public EdictItem[] GetEdicts(string filter)
        {
            return _edicts.Where(item => item.Header.Contains(filter)).ToArray();
        }
        public EdictItem[] GetFilters(EdictItem[] edicts,  string filter)
        {
            return edicts.Where(item => item.ExecutedPerson.ToString().Contains(filter)).ToArray();
        }

        public int AddEdict(EdictItem edict)
        {
            var maxId = _edicts.Max(x => x.Id);
            maxId++;
            edict.Id = maxId;
            _edicts.Add(edict);
            return maxId;
        }

        public void UpdateEdict(EdictItem edict)
        {
            var currentEdict = _edicts.FirstOrDefault(e => e.Id == edict.Id);
            if (currentEdict != null)
            {
                currentEdict.Header = edict.Header;
                currentEdict.Description = edict.Description;
                currentEdict.DayOfComplete = edict.DayOfComplete;
                currentEdict.ExecutedPerson = edict.ExecutedPerson;
            }
        }

        public void DeleteEdicts(int[] ids)
        {
            var currentEdictsForDelete = _edicts.Where(e => ids.Contains(e.Id)).ToList();
            foreach (var itemEdict in currentEdictsForDelete)
            {
                _edicts.Remove(itemEdict);
            }
        }
    }
}
